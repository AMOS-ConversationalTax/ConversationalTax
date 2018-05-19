import { Connection } from 'mongoose';

import { UserSchema } from './schemas/users.schema';
import DBConfig from '../dbconfig';

export const usersProviders = [
    {
        provide: DBConfig.USER_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model('Users', UserSchema),
        inject: [DBConfig.DB_PROVIDER],
    },
];