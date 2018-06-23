import { Module } from '@nestjs/common';
import { DatabaseDialogFlowService } from './database-dialogflow.service';
import { DatabaseLangService } from './database-lang.service';
import { EmploymentContractModule } from '../database/employmentContract/employmentContract.module';
import { UserModule } from '../database/user/user.module';
import { ConversationHistoryModule } from '../database/conversationHistory/conversationHistory.module';

/**
 * Class that exports the connectors module
 */
@Module({
    imports: [EmploymentContractModule, ConversationHistoryModule, UserModule],
    providers: [DatabaseDialogFlowService, DatabaseLangService],
    exports: [DatabaseDialogFlowService, DatabaseLangService],
})
export class ConnectorsModule { }