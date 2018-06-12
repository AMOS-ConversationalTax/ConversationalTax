import { Module } from '@nestjs/common';
import { ConversationHistoryService } from './conversationHistory.service';
import { conversationHistoryProviders } from './conversationHistory.providers';
import { ConversationHistoryController } from './conversationHistory.controller';
import { DatabaseModule } from '../database.module';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { conversationHistorySchema } from './schemas/conversationHistory.schema';
import DBConfig from '../dbconfig';

@Module({
    imports: [DatabaseModule, MongooseModule.forFeature([{ name: DBConfig.CONVERSATIONHISTORY_MODEL_PROVIDER, schema: conversationHistorySchema }])],
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