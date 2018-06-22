import { Module } from '@nestjs/common';
import { UserModule } from '../database/user/user.module';
import { ConversationHistoryModule } from '../database/conversationHistory/conversationHistory.module';
import { ReminderModule } from '../database/reminder/reminder.module';
import { EmploymentContractModule } from '../database/employmentContract/employmentContract.module';
import { LangController } from './lang.controller';
import { DialogFlowService } from './dialog-flow/dialog-flow.service';
import { ConnectorsModule } from '../connectors/connectors.module';
import { ExplanationService } from './explanation/explanation.service';
import { StrategyModule } from './intents/strategy/strategy.module';

/**
 * The class that exports the lang module
 */
@Module({
    imports: [UserModule, ReminderModule, EmploymentContractModule, ConnectorsModule, ConversationHistoryModule, StrategyModule],
    controllers: [LangController],
    providers: [DialogFlowService, ExplanationService],
})
export class LangModule { }
