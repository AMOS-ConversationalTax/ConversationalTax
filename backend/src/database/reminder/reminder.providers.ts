import { Connection } from 'mongoose';
import { reminderSchema } from './schemas/reminder.schema';
import DBConfig from '../dbconfig';

/**
 * The provider of the reminder table in the mongo datastore
 * @name reminderProviders
 * @type {any}
 */
export const reminderProviders: any = [
    {
        provide: DBConfig.REMINDER_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model(DBConfig.REMINDER_MODEL_PROVIDER, reminderSchema),
        inject: [DBConfig.DB_PROVIDER],
    },
];