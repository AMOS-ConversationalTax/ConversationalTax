import { Module } from '@nestjs/common';
import { NotificationsGateway } from './notifications.gateway';
import { NotificationsController } from './notifications.controller';
import { NotificationService } from './notification-service';

@Module({
    imports: [],
    controllers: [NotificationsController],
    providers: [NotificationsGateway, NotificationService],
})
export class NotificationsModule {}
