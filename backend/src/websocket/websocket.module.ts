import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { NotificationsModule } from 'notifications/notifications.module';
import { NotificationsDBModule } from '../database/notifications/notifications.module';

@Module({
    imports: [NotificationsModule, NotificationsDBModule],
    providers: [WebsocketGateway],
})
export class WebsocketModule {}
