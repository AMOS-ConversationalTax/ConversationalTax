import { Module } from '@nestjs/common';
import { ConversationHistoryService } from './conversationHistory.service';
import { conversationHistoryProviders } from './conversationHistory.providers';
import { ConversationHistoryController } from './conversationHistory.controller';
import { DatabaseModule } from '../database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ConversationHistoryController],
    providers: [
        ConversationHistoryService,
        ...conversationHistoryProviders,
    ],
    exports: [
        ConversationHistoryService,
    ],
})
export class ConversationHistoryModule { }