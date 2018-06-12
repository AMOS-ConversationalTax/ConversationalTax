import { Connection } from 'mongoose';
import { userSchema } from './schemas/user.schema';
import DBConfig from '../dbconfig';

/**
 * The provider of the users table in the mongo datastore
 * @name userProviders
 * @type {any}
 */
export const userProviders: any = [
    {
        provide: DBConfig.USER_MODEL_PROVIDER,
        useFactory: (mongoose) => mongoose.connection.model(DBConfig.USER_MODEL_PROVIDER, userSchema),
        inject: [DBConfig.DB_PROVIDER],
    },
];