import { Controller, Post, Body, UseInterceptors, FileInterceptor, UploadedFile, Query, BadRequestException } from '@nestjs/common';
import { DialogFlowService } from './dialog-flow.service';
import { AudioIntentParams, TextIntentParams, TextIntentBody } from './lang.dto';
import { UserService } from '../database/user/user.service';
import { EmploymentContractService } from '../database/employmentContract/employmentContract.service';

const ANDROID_AUDIO_SETTINGS = {
  encoding: 'AUDIO_ENCODING_AMR_WB',
  sampleRate: 16000,
};

const IOS_AUDIO_SETTINGS = {
  encoding: 'AUDIO_ENCODING_LINEAR_16',
  sampleRate: 16000,
};

@Controller('lang')
export class LangController {

  constructor(
    private dialogFlowService: DialogFlowService,
    private userService: UserService,
    private contractService: EmploymentContractService,
  ) {}

  @Post('text')
  async textIntent(@Body() body: TextIntentBody, @Query() params: TextIntentParams) {
    const dialogflowResponse = await this.dialogFlowService.detectTextIntent(body.textInput, params.u_id);
    const responseText = this.dialogFlowService.extractResponseText(dialogflowResponse[0]);
    return { text: responseText };
  }

  @Post('audio_upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Query() params: AudioIntentParams) {
    const dialogflowResponse = await this.processAudiofile(file, params);
    const intent = this.dialogFlowService.extractResponseIntent(dialogflowResponse[0]);
    const uid = params.u_id;

    // TODO move to new architecture as soon as it has been finished.
    // TODO intent name should be moved into a const (as part of the above task)
    if (intent.name === 'projects/test-c7ec0/agent/intents/ae4cd4c7-67ea-41e3-b064-79b0a75505c5') {
      if (!await this.userService.exists(uid)) {
        this.userService.create(uid);
      }
      const contractId = this.contractService.create(uid);
    }

    // TODO move to new architecture as soon as it has been finished.
    // TODO intent name should be moved into a const (as part of the above task)
    if (intent.name === 'projects/test-c7ec0/agent/intents/99d07e41-0833-4e50-991e-5f49ba4e9bc4') {

      try {

        const response: any = dialogflowResponse[0].queryResult.parameters;
        const startDate = response.fields.StartDate.stringValue;
        const employmentContractId = response.fields.EmploymentContract.stringValue;

        if ( ! await this.contractService.editStartDateExact(employmentContractId, startDate))
        {

          return { text: 'Beim Ändern des Startdatums ist ein Fehler aufgetreten. Bitte versuche es erneut' };

        }

      } catch (error) {

        return { text: 'Beim Ändern des Startdatums ist ein Fehler aufgetreten. Bitte versuche es erneut' };

      }

    }

    const responseText = this.dialogFlowService.extractResponseText(dialogflowResponse[0]);
    return { text: responseText };
  }

  /**
   * Converts the received audio to Base64 and hands it to the DialogFlow service.
   * @param file The uploaded file.
   * @param params URL params which contain the userID as well as the platform.
   * @returns {Promise<DetectIntentResponse[]>} - A promise containing the response
   */
  private processAudiofile(file: any, params: AudioIntentParams): Promise<DetectIntentResponse[]> {
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

    return this.dialogFlowService.detectAudioIntent(encoding, sampleRate, base64Audio, params.u_id);
  }
}
