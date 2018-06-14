import { Module } from '@nestjs/common';
import { UserModule } from '../database/user/user.module';
import { ConversationHistoryModule } from '../database/conversationHistory/conversationHistory.module';
import { ReminderModule } from '../database/reminder/reminder.module';
import { EmploymentContractModule } from '../database/employmentContract/employmentContract.module';
import { LangController } from './lang.controller';
import { DialogFlowService } from './dialog-flow/dialog-flow.service';
import { ConnectorsModule } from '../connectors/connectors.module';
import { ExplanationService } from './explanation/explanation.service';

@Module({
    imports: [UserModule, ReminderModule, EmploymentContractModule, ConnectorsModule, ConversationHistoryModule],
    controllers: [LangController],
    providers: [DialogFlowService, ExplanationService],
})
export class LangModule { }
