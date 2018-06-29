import { Module } from '@nestjs/common';
import { ConnectorsModule } from './connectors/connectors.module';
import { EmploymentContractModule } from './database/employmentContract/employmentContract.module';
import { UserModule } from './database/user/user.module';
import { ReminderModule } from './database/reminder/reminder.module';
import { ConversationHistoryModule } from './database/conversationHistory/conversationHistory.module';
import { LangModule } from './lang/lang.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from './notifications/notifications.module';
import { WebsocketModule } from './websocket/websocket.module';
import Config from 'conv-tax-shared/config/config';
import { NotificationsDBModule } from 'database/notifications/notifications.module';
import { DebugModule } from './dev/dev.module';

/**
 * Class that exports the main module of the backend
 */
@Module({
  imports: [
    EmploymentContractModule,
    UserModule,
    ReminderModule,
    ConversationHistoryModule,
    LangModule,
    ConnectorsModule,
    NotificationsDBModule,
    NotificationsModule,
    WebsocketModule,
    MongooseModule.forRoot(Config.MONGO_URL),
    DebugModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
