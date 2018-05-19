import { Module } from '@nestjs/common';
import { UsersModule } from './database/users/users.module';
import { AppController } from './app.controller';
import { LangController } from './lang/lang.controller';
import { DialogFlowService } from './lang/dialog-flow.service';

@Module({
  imports: [UsersModule],
  controllers: [AppController, LangController],
  providers: [DialogFlowService],
})
export class AppModule {}
