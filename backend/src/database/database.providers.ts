import * as mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose-fix';
import Config from '../../config/config';
import DBConfig from './dbconfig';

export const databaseProviders = [
    {
        provide: DBConfig.DB_PROVIDER,
        useFactory: async () => {

            (mongoose as any).Promise = global.Promise;

            if (process.env.NODE_ENV === 'test') {

                const mockgoose = new Mockgoose(mongoose);
                mockgoose.helper.setDbVersion('3.6');

                mockgoose.prepareStorage()
                    .then(async () => {
                        await mongoose.connect('mongodb://example.com/TestingDB');
                });

            } else {

                try {

                    return await mongoose.connect(Config.MONGO_URL);

                } catch {

                    // tslint:disable:no-console
                    console.error('################################');
                    console.error('################################');
                    console.error('################################');
                    console.error('Could not connect to MongoDB. Skipping...');
                    console.error('################################');
                    console.error('################################');
                    console.error('################################');
                    // Return monogDB mock
                    return { model: () => {} };

                }

            }

            return mongoose;

        },
    },
];