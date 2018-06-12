import { Controller, Post, Body, UseInterceptors, FileInterceptor, UploadedFile, Query, BadRequestException } from '@nestjs/common';
import { DialogFlowService } from './dialog-flow/dialog-flow.service';
import { AudioIntentParams, TextIntentParams, TextIntentBody } from './lang.dto';
import { UserService } from '../database/user/user.service';
import { ConversationHistoryService } from '../database/conversationHistory/conversationHistory.service';
import { ConversationHistoryParameters } from '../database/conversationHistory/interfaces/conversationHistoryParameters.interface';
import { EmploymentContractService } from '../database/employmentContract/employmentContract.service';
import { ExplanationService } from './explanation/explanation.service';
import { DatabaseLangService } from '../connectors/database-lang.service';
import { ConversationHistory } from '../database/conversationHistory/interfaces/conversationHistory.interface';
import { EmployeeService } from './services/employee.service';

const USER_NAME = 'dummyBoy';

const ANDROID_AUDIO_SETTINGS = {
  encoding: 'AUDIO_ENCODING_AMR_WB',
  sampleRate: 16000,
};

const IOS_AUDIO_SETTINGS = {
  encoding: 'AUDIO_ENCODING_LINEAR_16',
  sampleRate: 16000,
};

const INTENT_HELP = 'projects/test-c7ec0/agent/intents/e695c10c-0a85-4ede-a899-67f264ff5275';
const INTENT_CONTEXT = 'projects/test-c7ec0/agent/intents/39611549-cad9-4152-9130-22ed7879e700';
const INTENT_DEFAULT = 'projects/test-c7ec0/agent/intents/41d8bfa1-b463-4d15-a1ea-9491f5ee1a76';

@Controller('lang')
export class LangController {

  constructor(
    private dialogFlowService: DialogFlowService,
    private userService: UserService,
    private contractService: EmploymentContractService,
    private explanationService: ExplanationService,
    private databaseLangService: DatabaseLangService,
    private employeeService: EmployeeService,
  ) {}

  @Post('text')
  async textIntent(@Body() body: TextIntentBody, @Query() params: TextIntentParams) {
    const dialogflowResponse = await this.dialogFlowService.detectTextIntent(body.textInput, params.u_id);
    const intent = this.dialogFlowService.extractResponseIntent(dialogflowResponse[0]);
    const uid = params.u_id;
    let actionName: string = this.dialogFlowService.extractResponseAction(dialogflowResponse[0]);
    if (actionName === '') {
      actionName = 'undefined';
    }

    const responseText = this.dialogFlowService.extractResponseText(dialogflowResponse[0]);

    // Add a new conversation history entry to the data store
    this.databaseLangService.createConversationHistoryEntry(uid, dialogflowResponse, responseText, intent, actionName);

    return { text: responseText };
  }

  @Post('audio_upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Query() params: AudioIntentParams) {
    const dialogflowResponse = await this.processAudiofile(file, params);
    const intent = this.dialogFlowService.extractResponseIntent(dialogflowResponse[0]);
    const uid = params.u_id;
    let actionName: string = this.dialogFlowService.extractResponseAction(dialogflowResponse[0]);
    if (actionName === '') {
      actionName = 'undefined';
    }

    if (intent != null) {

      const response = await this.handleIntent(uid, intent, dialogflowResponse);

      if (response !== undefined) {

        // Add a new conversation history entry to the data store
        this.databaseLangService.createConversationHistoryEntry(uid, dialogflowResponse, response.text, intent, actionName);

        return response;

      }

    }

    const responseText = this.dialogFlowService.extractResponseText(dialogflowResponse[0]);

    // Add a new conversation history entry to the data store
    this.databaseLangService.createConversationHistoryEntry(uid, dialogflowResponse, responseText, intent, actionName);
    this.employeeService.processEmployeeContract(dialogflowResponse[0], USER_NAME);
    return { text: responseText };
  }

  /**
   * Converts the received audio to Base64 and hands it to the DialogFlow service.
   * @param file The uploaded file.
   * @param params URL params which contain the userID as well as the platform.
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

  // TODO move to new architecture as soon as it has been finished.
  // TODO intent name should be moved into a const (as part of the above task)
  private async handleIntent(uid: string, intent: Intent, dialogflowResponse: DetectIntentResponse[]): Promise<ReturnText | undefined> {
    if (intent.name === 'projects/test-c7ec0/agent/intents/ae4cd4c7-67ea-41e3-b064-79b0a75505c5') {

      if (!await this.userService.exists(uid)) {

        this.userService.create(uid);

      }
      const contractId = this.contractService.create(uid);

    } else if (intent.name === 'projects/test-c7ec0/agent/intents/99d07e41-0833-4e50-991e-5f49ba4e9bc4') {

      try {

        const response: any = dialogflowResponse[0].queryResult.parameters;
        const startDate = response.fields.StartDate.stringValue;
        const employmentContractId = response.fields.EmploymentContract.stringValue;

        // If our parameters are not ready Dialogflow will ask for them
        if (employmentContractId !== '' && startDate !== '') {

          if (! await this.contractService.editStartDateExact(employmentContractId, startDate)) {

            throw new Error('Contract start date could not be changed');

          }

        }

      } catch (error) {

        return { text: 'Beim Ändern des Startdatums ist ein Fehler aufgetreten. Bitte versuche es erneut' };

      }

    } else if (intent.name === 'projects/test-c7ec0/agent/intents/d1523cf3-bb4d-47cb-8fc4-bec3d669628e') {

      try {

        const response: any = dialogflowResponse[0].queryResult.parameters;
        const employmentContractId = response.fields.EmploymentContract.stringValue;

        // If our parameters are not ready Dialogflow will ask for them
        if (employmentContractId !== '') {

          if (! await this.contractService.editEndDateString(employmentContractId, 'unbefristet')) {

            throw new Error('Contract end date could not be changed');

          }

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
