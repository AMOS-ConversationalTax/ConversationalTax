import { Controller, Post, Body, UseInterceptors, FileInterceptor, UploadedFile, Query, BadRequestException } from '@nestjs/common';
import { DialogFlowService } from './dialog-flow.service';
import { AudioIntentParams, TextIntentParams } from './lang.dto';
import { EmployeeService } from './employee.service';
import { EmploymentContractService } from 'database/employmentContract/employmentContract.service';

const USER_NAME = 'dummyBoy';

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

  constructor(private dialogFlowService: DialogFlowService, private employeeService: EmployeeService) {}

  @Post('text')
  async textIntent(@Body() body: TextIntentParams) {
    const dialogflowResponse = await this.dialogFlowService.detectTextIntent(body.textInput);
    const responseText = this.dialogFlowService.extractResponseText(dialogflowResponse[0]);
    return { text: responseText };
  }

  @Post('audio_upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Query() params: AudioIntentParams) {
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

    const dialogflowResponse = await this.dialogFlowService.detectAudioIntent(encoding, sampleRate, base64Audio);
    this.employeeService.processEmployeeContract(dialogflowResponse[0], USER_NAME);
    const responseText = this.dialogFlowService.extractResponseText(dialogflowResponse[0]);
    return { text: responseText };
  }
}
