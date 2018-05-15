import { Controller, Post, Body } from '@nestjs/common';
import { DialogFlowService } from './dialog-flow.service';
import { AudioIntentParams, TextIntentParams } from './lang.dto';

@Controller('lang')
export class LangController {

  constructor(private dialogFlowService: DialogFlowService) {}

  @Post('audio')
  audioIntent(@Body() params: AudioIntentParams) {
    return this.dialogFlowService.detectAudioIntent(params.encoding, params.sampleRate, params.inputAudio);
  }

  @Post('text')
  textIntent(@Body() params: TextIntentParams) {
    return this.dialogFlowService.detectTextIntent(params.textInput);
  }
}
