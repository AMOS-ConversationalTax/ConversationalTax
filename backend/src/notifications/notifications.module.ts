import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationService } from './notification-service';

@Module({
    imports: [],
    controllers: [NotificationsController],
    providers: [NotificationService],
})
export class NotificationsModule {}
