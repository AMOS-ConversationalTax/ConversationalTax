import { Controller, Post, Body, UseInterceptors, FileInterceptor, UploadedFile, Query, BadRequestException } from '@nestjs/common';
import { DialogFlowService } from './dialog-flow.service';
import { AudioIntentParams, TextIntentParams, TextIntentBody } from './lang.dto';

const ANDROID_AUDIO_SETTINGS = {
  encoding: 'AUDIO_ENCODING_AMR_WB',
  sampleRate: 16000,
};

const IOS_AUDIO_SETTINGS = {
  encoding: 'AUDIO_ENCODING_LINEAR_16',
  sampleRate: 44100,
};

@Controller('lang')
export class LangController {

  constructor(private dialogFlowService: DialogFlowService) {}

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
    const responseText = this.dialogFlowService.extractResponseText(dialogflowResponse[0]);
    return { text: responseText };
  }

  /**
   * Converts the received audio to Base64 and hands it to the DialogFlow service
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
