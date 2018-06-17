import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { MongooseModule } from '@nestjs/mongoose';
import DBConfig from '../dbconfig';
import { NotificationsSchema } from './schemas/notifications.schema';
import { NotificationsDBService } from './notifications.service';
import { NotificationsProviders } from './notifications.providers';

@Module({
    imports: [DatabaseModule,
        MongooseModule.forFeature([{
            name: DBConfig.NOTIFICATIONS_MODEL_PROVIDER,
            schema: NotificationsSchema,
        }])],
    providers: [
        NotificationsDBService,
        ...NotificationsProviders,
    ],
    exports: [
        NotificationsDBService,
    ],
})
export class NotificationsDBModule { }