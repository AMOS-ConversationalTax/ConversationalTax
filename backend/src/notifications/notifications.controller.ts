import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification-service';

@Controller('notifications')
export class NotificationsController {

    constructor(private notificationService: NotificationService) {
    }

    @Get()
    root(): void {
        this.notificationService.emitNotification();
    }
}
