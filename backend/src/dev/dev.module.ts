import { Module } from '@nestjs/common';
import { DevController } from './dev.controller';
import { EmploymentContractModule } from '../database/employmentContract/employmentContract.module';
import { ConversationHistoryModule } from '../database/conversationHistory/conversationHistory.module';
import { NotificationsDBModule } from '../database/notifications/notifications.module';

/**
 * Class that exports the main module of the backend
 */
@Module({
    imports: [EmploymentContractModule, ConversationHistoryModule, NotificationsDBModule],
    controllers: [DevController],
    providers: [],
})
export class DebugModule { }
