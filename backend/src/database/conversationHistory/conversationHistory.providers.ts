import { Connection } from 'mongoose';
import { conversationHistorySchema } from './schemas/conversationHistory.schema';
import DBConfig from '../dbconfig';

/**
 * The provider of the conversationHistory table in the mongo datastore
 * @name conversationHistoryProviders
 * @type {any}
 */
export const conversationHistoryProviders: any = [
    {
        provide: DBConfig.CONVERSATIONHISTORY_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model(DBConfig.CONVERSATIONHISTORY_MODEL_PROVIDER, conversationHistorySchema),
        inject: [DBConfig.DB_PROVIDER],
    },
];