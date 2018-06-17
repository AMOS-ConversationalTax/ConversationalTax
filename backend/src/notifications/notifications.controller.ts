import { Controller, Get, Query } from '@nestjs/common';
import { NotificationService } from './notification-service';
import { GetNotificationsQuery } from './notifications.dto';
import { NotificationsDBService } from '../database/notifications/notifications.service';

@Controller('notifications')
export class NotificationsController {

    constructor(private notificationService: NotificationService, private readonly notificationDb: NotificationsDBService) {
    }

    @Get('emit-demo')
    emitDemoNotifications(): void {
        this.notificationService.emitNotification();
    }

    @Get()
    getUsersNotifications(@Query() params: GetNotificationsQuery) {
        return this.notificationDb.findNotificationByUser(params.u_id);
    }

    @Get('markAsRead')
    markAsRead(@Query() params: GetNotificationsQuery) {
        return this.notificationDb.markAsRead(params.u_id);
    }
}
