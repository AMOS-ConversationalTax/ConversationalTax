import { Connection } from 'mongoose';
import { userSchema } from './schemas/users.schema';
import DBConfig from '../dbconfig';

/**
 * The provider of the users table in the mongo datastore
 * @name usersProviders
 * @type {any}
 */
export const usersProviders: any = [
    {
        provide: DBConfig.USER_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model(DBConfig.USER_MODEL_PROVIDER, userSchema),
        inject: [DBConfig.DB_PROVIDER],
    },
];