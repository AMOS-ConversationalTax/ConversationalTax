import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsDBModule } from '../database/notifications/notifications.module';
import { NotificationService } from './notification-service';
import { UserService } from './../database/user/user.service';

@Module({
    imports: [NotificationsDBModule, UserService],
    controllers: [NotificationsController],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationsModule {}
