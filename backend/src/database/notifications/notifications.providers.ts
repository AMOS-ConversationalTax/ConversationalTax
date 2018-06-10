import { Connection } from 'mongoose';
import { NotificationsSchema } from './schemas/notifications.schema';
import DBConfig from '../dbconfig';

/**
 * The provider of the notification table in the mongo datastore
 * @name notificationProviders
 * @type {any}
 */
export const NotificationsProviders: any = [
    {
        provide: DBConfig.NOTIFICATIONS_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model(DBConfig.NOTIFICATIONS_MODEL_PROVIDER, NotificationsSchema),
        inject: [DBConfig.DB_PROVIDER],
    },
];