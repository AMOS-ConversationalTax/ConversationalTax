import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LangController } from './lang/lang.controller';
import { DialogFlowService } from './lang/dialog-flow.service';

@Module({
  imports: [],
  controllers: [AppController, LangController],
  components: [DialogFlowService],
})
export class AppModule {}
