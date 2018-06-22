import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsDBModule } from '../database/notifications/notifications.module';
import { NotificationService } from './notification-service';
import { UserModule } from '../database/user/user.module';

/**
 * The class that exports the NotificationsModule
 */
@Module({
    imports: [NotificationsDBModule, UserModule],
    controllers: [NotificationsController],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationsModule {}
