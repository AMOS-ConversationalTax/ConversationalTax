import { Module } from '@nestjs/common';
import { NotificationsDBService } from './notifications.service';
import { NotificationsProviders } from './notifications.providers';
import { DatabaseModule } from '../database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        NotificationsDBService,
        ...NotificationsProviders,
    ],
    exports: [
        NotificationsDBService,
    ],
})
export class NotificationsDBModule { }