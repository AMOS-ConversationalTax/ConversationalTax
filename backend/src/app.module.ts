import { Module } from '@nestjs/common';
import { ConnectorsModule } from './connectors/connectors.module';
import { EmploymentContractModule } from './database/employmentContract/employmentContract.module';
import { UserModule } from './database/user/user.module';
import { ReminderModule } from './database/reminder/reminder.module';
import { ConversationHistoryModule } from './database/conversationHistory/conversationHistory.module';
import { AppController } from './app.controller';
import { LangModule } from './lang/lang.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from './notifications/notifications.module';
import { WebsocketModule } from './websocket/websocket.module';
import Config from '../config/config';

@Module({
  imports: [EmploymentContractModule,
            UserModule,
            ReminderModule,
            ConversationHistoryModule,
            LangModule,
            ConnectorsModule,
            NotificationsModule,
            WebsocketModule,
            MongooseModule.forRoot(Config.MONGO_URL)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
