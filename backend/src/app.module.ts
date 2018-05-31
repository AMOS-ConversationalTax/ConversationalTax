import { Module } from '@nestjs/common';
import { UserModule } from './database/user/user.module';
import { EmploymentContractModule } from './database/employmentContract/employmentContract.module';
import { AppController } from './app.controller';
import { DialogFlowService } from './lang/dialog-flow.service';
import { LangController } from './lang/lang.controller';
import { EmploymentContractService } from './database/employmentContract/employmentContract.service';
import { ReminderService } from './database/reminder/reminder.service';
import { UserService } from './database/user/user.service';
import { DatabaseDialogFlowService } from './connectors/database-dialogflow.service';
import { LangModule } from 'lang/lang.module';

@Module({
  imports: [UserModule, EmploymentContractModule, LangModule],
  controllers: [AppController, LangController],
  providers: [DialogFlowService, EmploymentContractService, ReminderService, UserService, DatabaseDialogFlowService],
})
export class AppModule {}
