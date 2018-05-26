import * as mongoose from 'mongoose';
import Config from '../../config/config';
import DBConfig from './dbconfig';

export const databaseProviders = [
    {
        provide: DBConfig.DB_PROVIDER,
        useFactory: async () => {
            (mongoose as any).Promise = global.Promise;
            try {
                return await mongoose.connect(Config.MONGO_URL);
            } catch {
                // tslint:disable:no-console
                console.error('################################');
                console.error('################################');
                console.error('Could not connect to MongoDB. Skipping...');
                console.error('Could not connect to MongoDB. Skipping...');
                console.error('Could not connect to MongoDB. Skipping...');
                console.error('################################');
                console.error('################################');
                // Return monogDB mock
                return { model: () => {} };
            }
        },
    },
];