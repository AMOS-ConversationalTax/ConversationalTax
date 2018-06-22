import { Controller, Get, Query } from '@nestjs/common';
import { NotificationService } from './notification-service';
import { GetNotificationsQuery } from './notifications.dto';
import { NotificationsDBService } from '../database/notifications/notifications.service';

/**
 * A class implementing the controller for the notification module
 */
@Controller('notifications')
export class NotificationsController {

    /**
     * The constructor for the NotificationsController
     * @param {NotificationService} notificationService A instance of the NotificationService - injected by DI
     * @param {NotificationsDBService} notificationDb A instance of the NotificationsDBService - injected by DI
     */
    constructor(private notificationService: NotificationService, private readonly notificationDb: NotificationsDBService) {
    }

    /**
     * A function to emit some demo notifications - primarily used by developers to show the feature
     */
    @Get('emit-demo')
    emitDemoNotifications(): void {
        this.notificationService.emitNotification();
    }

    /**
     * A function to get all notifications of an user
     * @param {GetNotificationsQuery} params The params of the query containing the uid of the user
     */
    @Get()
    getUsersNotifications(@Query() params: GetNotificationsQuery) {
        return this.notificationDb.findNotificationByUser(params.u_id);
    }

    /**
     * A function to mark the notifications of an user as read
     * @param {GetNotificationsQuery} params The params of the query containing the uid of the user
     */
    @Get('markAsRead')
    markAsRead(@Query() params: GetNotificationsQuery) {
        return this.notificationDb.markAsRead(params.u_id);
    }
}
