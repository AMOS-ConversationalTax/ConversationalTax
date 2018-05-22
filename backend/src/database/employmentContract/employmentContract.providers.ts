import { Connection } from 'mongoose';
import { employmentContractSchema } from './schemas/employmentContract.schema';
import DBConfig from '../dbconfig';

/**
 * The provider of the employmentContract table in the mongo datastore
 * @name employmentContractProviders
 * @type {any}
 */
export const employmentContractProviders: any = [
    {
        provide: DBConfig.EMPLOYMENTCONTRACT_MODEL_PROVIDER,
        useFactory: (connection: Connection) => connection.model(DBConfig.EMPLOYMENTCONTRACT_MODEL_PROVIDER, employmentContractSchema),
        inject: [DBConfig.DB_PROVIDER],
    },
];