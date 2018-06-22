import { Controller, Post, Body, UseInterceptors, FileInterceptor, UploadedFile, Query, BadRequestException } from '@nestjs/common';
import { DialogFlowService } from './dialog-flow/dialog-flow.service';
import { AudioIntentParams, TextIntentParams, TextIntentBody } from './lang.dto';
import { DatabaseLangService } from '../connectors/database-lang.service';
import { IntentStrategy } from './intents/strategy/strategy.intent';

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
    private databaseLangService: DatabaseLangService,
    private intentStrategy: IntentStrategy,
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
    dialogflowResponse: DetectIntentResponse, params: TextIntentParams | AudioIntentParams,
  ): Promise<ReturnText> {

    // e.g. empty Audio File
    if (dialogflowResponse.queryResult.queryText === '') {
      return { text: '' };
    }

    const intent = this.dialogFlowService.extractResponseIntent(dialogflowResponse);
    const actionName = this.dialogFlowService.extractResponseAction(dialogflowResponse);

    const intentHandler = this.intentStrategy.createIntentHandler(intent.name);
    const intentData = this.createIntentData(dialogflowResponse, params);

    let response = await intentHandler.handle(intentData);
    if (response === undefined) {
      response = {text: this.dialogFlowService.extractResponseText(dialogflowResponse)};
    }

    await this.createConversationHistoryEntry(params.u_id, dialogflowResponse, response.text, intent, actionName);
    return response;
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
   * Adapter function. Converts DialogFlows response to the IntentHandler's IIntentData
   * @param dialogflowResponse The response from DialogFlow
   * @param params The query params
   */
  private createIntentData(dialogflowResponse: DetectIntentResponse, params: TextIntentParams | AudioIntentParams): IIntentData {
    const responseParam = this.dialogFlowService.extractParameter(dialogflowResponse);
    const allParamSet = this.dialogFlowService.extractReqParameterPresent(dialogflowResponse);

    return {
      parameter: responseParam, allParameterSet: allParamSet, user: params.u_id,
    };
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
  private async createConversationHistoryEntry(
    uid: string, dialogflowResponse: DetectIntentResponse, responseText: string, intent: Intent, actionName: string,
  ) {
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

    if ( intent.hasOwnProperty('name') ) {
      intentName = intent.name;
    }

    if ( intent.hasOwnProperty('displayName') ) {
      intentDisplayName = intent.displayName;
    }

    // Add a new conversation history entry to the data store
    await this.databaseLangService.createConversationHistoryEntry(
      uid, parameters, queryText, responseText, intentName, intentDisplayName, actionName,
    );

  }

}
