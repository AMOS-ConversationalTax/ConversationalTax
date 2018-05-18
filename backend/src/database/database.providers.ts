import * as mongoose from 'mongoose';
import Config from '../../config/config';

export const databaseProviders = [
    {
        provide: Config.DB_PROVIDER,
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            return await mongoose.connect(Config.MONGO_URL);
        },
    },
];