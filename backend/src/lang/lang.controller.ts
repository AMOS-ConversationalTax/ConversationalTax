import { Controller, Post, Body, UseInterceptors, FileInterceptor, UploadedFile, Query, BadRequestException } from '@nestjs/common';
import { DialogFlowService } from './dialog-flow/dialog-flow.service';
import { AudioIntentParams, TextIntentParams, TextIntentBody } from './lang.dto';
import { UserService } from '../database/user/user.service';
import { EmploymentContractService } from '../database/employmentContract/employmentContract.service';
import { ExplanationService } from './explanation/explanation.service';
import { DatabaseLangService } from '../connectors/database-lang.service';
import { ConversationHistory } from '../database/conversationHistory/interfaces/conversationHistory.interface';

/**
 * The settings of recorded android files
 * @type {any}
 */
const ANDROID_AUDIO_SETTINGS: any = {
  encoding: 'AUDIO_ENCODING_AMR_WB',
  sampleRate: 16000,
};

/**
 * The settings of recorded ios files
 * @type {any}
 */
const IOS_AUDIO_SETTINGS: any = {
  encoding: 'AUDIO_ENCODING_LINEAR_16',
  sampleRate: 16000,
};

/**
 * The uri of the help intent
 * @type {string}
 */
const INTENT_HELP: string = 'projects/test-c7ec0/agent/intents/e695c10c-0a85-4ede-a899-67f264ff5275';

/**
 * The uri of the context intent
 * @type {string}
 */
const INTENT_CONTEXT: string = 'projects/test-c7ec0/agent/intents/39611549-cad9-4152-9130-22ed7879e700';

/**
 * The uri of the default intent
 * @type {string}
 */
const INTENT_DEFAULT: string = 'projects/test-c7ec0/agent/intents/41d8bfa1-b463-4d15-a1ea-9491f5ee1a76';

/**
 * A controller to interact with the language understanding and analysis module
 * Does implement some logic for the analysis, too
 */
@Controller('lang')
export class LangController {

  /**
   * The constructor of the LangController
   * @param {DialogFlowService} dialogFlowService An instance of the DialogFlowService - injected by DI
   * @param {UserService} userService An instance of the UserService - injected by DI
   * @param {EmploymentContractService} contractService An instance of the EmploymentContractService - injected by DI
   * @param {ExplanationService} explanationService An instance of the ExplanationService - injected by DI
   * @param {DatabaseLangService} databaseLangService An instance of the DatabaseLangService - injected by DI
   */
  constructor(
    private dialogFlowService: DialogFlowService,
    private userService: UserService,
    private contractService: EmploymentContractService,
    private explanationService: ExplanationService,
    private databaseLangService: DatabaseLangService,
  ) {}

  /**
   * Send a text to the lang controller that should be analysed
   * @param {TextIntentBody} body The body containing the text that should be analysed
   * @param {TextIntentParams} params The params containing the uid of the user that started the query
   * @returns {Promise<ReturnText>} A promise containig the return text for the frontend
   */
  @Post('text')
  async textIntent(@Body() body: TextIntentBody, @Query() params: TextIntentParams): Promise<ReturnText> {
    const dialogflowResponse = await this.dialogFlowService.detectTextIntent(body.textInput, params.u_id);
    return this.handleResponse(dialogflowResponse[0], params);
  }

  /**
   * Send a audio file to the lang controller that should be analysed
   * @param {any} file The audio file that should be analysed
   * @param {AudioIntentParams} params The params containing the uid of the user that started the query
   * @returns {Promise<ReturnText>} A promise containig the return text for the frontend
   */
  @Post('audio_upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any, @Query() params: AudioIntentParams): Promise<ReturnText> {
    const dialogflowResponse = await this.processAudiofile(file, params);
    return this.handleResponse(dialogflowResponse[0], params);
  }

  /**
   * A helper function to handle a response
   * @param {DetectIntentResponse} dialogflowResponse The response object of dialogflow
   * @param {TextIntentParams|AudioIntentParams} params The params containing the uid of the user that started the query
   * @returns {Promise<ReturnText>} A Promise containing the return text to be output by the frontend
   */
  private async handleResponse(
    dialogflowResponse: DetectIntentResponse,
    params: TextIntentParams | AudioIntentParams,
  ): Promise<ReturnText> {

    if (dialogflowResponse.queryResult.queryText === '') {
      return { text: '' };
    }

    const intent = this.dialogFlowService.extractResponseIntent(dialogflowResponse);
    const actionName = this.dialogFlowService.extractResponseAction(dialogflowResponse);

    if (intent !== null && intent !== undefined) {
      const response = await this.handleIntent(params.u_id, intent, dialogflowResponse);
      if (response !== undefined) {
        await this.createConversationHistoryEntry(params.u_id, dialogflowResponse, response.text, intent, actionName);
        return response;
      }
    }

    const text = this.dialogFlowService.extractResponseText(dialogflowResponse);
    await this.createConversationHistoryEntry(params.u_id, dialogflowResponse, text, intent, actionName);
    return { text };
  }

  /**
   * Converts the received audio to Base64 and hands it to the DialogFlow service.
   * @param {any} file The uploaded file.
   * @param {AudioIntentParams} params URL params which contain the userID as well as the platform.
   * @returns {Promise<DetectIntentResponse[]>} - A promise containing the response
   */
  private async processAudiofile(file: any, params: AudioIntentParams): Promise<DetectIntentResponse[]> {
    if (file === undefined || file.buffer === undefined) {
      throw new BadRequestException('No audio file was uploaded');
    }
    const base64Audio: string = file.buffer.toString('base64');

    let encoding: string;
    let sampleRate: number;
    if (params.platform === 'android') {
      encoding = ANDROID_AUDIO_SETTINGS.encoding;
      sampleRate = ANDROID_AUDIO_SETTINGS.sampleRate;
    } else if (params.platform === 'ios') {
      encoding = IOS_AUDIO_SETTINGS.encoding;
      sampleRate = IOS_AUDIO_SETTINGS.sampleRate;
    } else {
      throw new BadRequestException('Unkown platform');
    }

    return await this.dialogFlowService.detectAudioIntent(encoding, sampleRate, base64Audio, params.u_id);
  }

  /**
   * Create a new conversation history entry (helper funtion)
   * @param {string} uid The id of the user
   * @param {DetectIntentResponse} dialogflowResponse The response object of dialogflow
   * @param {string} responseText The response to be logged (may be either the fulfillmentText of dialogflow
   * or a response generated by our code)
   * @param {Intent} intent The recognized intent
   * @param {string} actionName The recognized action
   */
  private async createConversationHistoryEntry(uid: string,
                                               dialogflowResponse: DetectIntentResponse,
                                               responseText: string,
                                               intent: Intent,
                                               actionName: string) {

    let parameters: any = { fields: {} };
    let queryText: string = 'Not specified';
    let intentName: string = 'Not specified';
    let intentDisplayName: string = 'Not specified';

    if ( dialogflowResponse.hasOwnProperty('queryResult') ) {

      if ( dialogflowResponse.queryResult.hasOwnProperty('parameters') ) {

        parameters = dialogflowResponse.queryResult.parameters;

      }

      if ( dialogflowResponse.queryResult.hasOwnProperty('queryText') ) {

        queryText = dialogflowResponse.queryResult.queryText;

      }

    }

    if ( intent !== null ) {

      if ( intent.hasOwnProperty('name') ) {

        intentName = intent.name;

      }

      if ( intent.hasOwnProperty('displayName') ) {

        intentDisplayName = intent.displayName;

      }

    }

    // Add a new conversation history entry to the data store
    await this.databaseLangService.createConversationHistoryEntry(uid,
                                                                  parameters,
                                                                  queryText,
                                                                  responseText,
                                                                  intentName,
                                                                  intentDisplayName,
                                                                  actionName);

  }

  /**
   * A helper function to handle a single intent
   * TODO move to new architecture as soon as it has been finished.
   * TODO intent name should be moved into a const (as part of the above task)
   * @param {string} uid The uid of the user who started the query
   * @param {Intent} intent The intent object containing informations about the intent
   * @param {DetectIntentResponse} dialogflowResponse The reponse object as returned by Dialogflow
   * @returns {Promise<ReturnText | undefined>} A Promise containting the return text that should be output
   */
  private async handleIntent(uid: string, intent: Intent, dialogflowResponse: DetectIntentResponse): Promise<ReturnText | undefined> {
    if (intent.name === 'projects/test-c7ec0/agent/intents/ae4cd4c7-67ea-41e3-b064-79b0a75505c5') {

      if (!await this.userService.exists(uid)) {

        this.userService.create(uid);

      }
      await this.contractService.create(uid);

    } else if (intent.name === 'projects/test-c7ec0/agent/intents/99d07e41-0833-4e50-991e-5f49ba4e9bc4') {

      try {

        if (dialogflowResponse.queryResult.allRequiredParamsPresent) {

          const response: any = dialogflowResponse.queryResult.parameters;

          // EmploymentContract is always a stringValue
          const employmentContractId: string = response.fields.EmploymentContract.stringValue;

          // Start Date is always a structValue
          const startDate: any = response.fields.StartDate.structValue;

          // If a date was recognized as an exact date, startDate has the property 'StartDateAsDate'
          if ( startDate.fields.hasOwnProperty('StartDateAsDate') ) {

            // Although start date is recognized as a date, the value is present in stringValue
            const startDateExact: any = startDate.fields.StartDateAsDate.stringValue;

            await this.contractService.editStartDateExact(employmentContractId, startDateExact);

            // If set was successfull we want to remove a possibly existing startDateString
            await this.contractService.deleteStartDateString(employmentContractId);

          // If a date was not recognized as an exact date, startDate has the property 'StartDateAsDate'
          } else if ( startDate.fields.hasOwnProperty('StartDateAsString') ) {

            // The value of startDate is present in stringValue
            const startDateString: any = startDate.fields.StartDateAsString.stringValue;

            await this.contractService.editStartDateString(employmentContractId, startDateString);

            // If set was successfull we want to remove a possibly existing startDateExact
            await this.contractService.deleteStartDateExact(employmentContractId);

          }
        }

      } catch (error) {

        return { text: 'Beim Ändern des Startdatums ist ein Fehler aufgetreten. Bitte versuche es erneut' };

      }

    } else if (intent.name === 'projects/test-c7ec0/agent/intents/d1523cf3-bb4d-47cb-8fc4-bec3d669628e') {

      try {

        const response: any = dialogflowResponse.queryResult.parameters;
        const employmentContractId = response.fields.EmploymentContract.stringValue;

        // If our parameters are not ready Dialogflow will ask for them
        if (employmentContractId !== '') {

          await this.contractService.editEndDateString(employmentContractId, 'unbefristet');

        }

      } catch (error) {

        return { text: 'Beim Ändern des Enddatums ist ein Fehler aufgetreten. Bitte versuche es erneut' };

      }

    } else if (intent.name === INTENT_HELP) {

      // Return Help
      const history: Array<ConversationHistory> = await this.databaseLangService.getConversationHistoryOfUserWithoutIntents(uid,
                                                                                                                           [INTENT_HELP,
                                                                                                                            INTENT_CONTEXT,
                                                                                                                            INTENT_DEFAULT]);

      if (history.length > 0) {

        const previousResponse = history[0];
        const text = this.explanationService.getHelpText(previousResponse.intent, previousResponse.action);
        return { text };

      }

      return { text: 'Es gibt keine letzte Anfrage zu der ich dir eine Hilfestellung geben könnte' };

    } else if (intent.name === INTENT_CONTEXT) {

      // Return Context
      const history: Array<ConversationHistory> = await this.databaseLangService.getConversationHistoryOfUserWithoutIntents(uid,
                                                                                                                           [INTENT_HELP,
                                                                                                                            INTENT_CONTEXT,
                                                                                                                            INTENT_DEFAULT]);
      if (history.length > 0) {

        const previousResponse = history[0];
        const text = this.explanationService.getContextExplanation(previousResponse.intent);
        return { text };

      }

      return { text: 'Es gibt keine letzte Anfrage zu der ich dir den Kontext nennen könnte' };

    }

    return undefined;

  }

}
