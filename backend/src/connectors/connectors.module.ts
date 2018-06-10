import { Module } from '@nestjs/common';
import { DatabaseDialogFlowService } from './database-dialogflow.service';
import { DatabaseLangService } from './database-lang.service';
import { EmploymentContractModule } from '../database/employmentContract/employmentContract.module';
import { ConversationHistoryModule } from '../database/conversationHistory/conversationHistory.module';

@Module({
    imports: [EmploymentContractModule, ConversationHistoryModule],
    providers: [DatabaseDialogFlowService, DatabaseLangService],
    exports: [DatabaseDialogFlowService, DatabaseLangService],
})
export class ConnectorsModule { }