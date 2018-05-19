import * as mongoose from 'mongoose';
import DBConfig from '../../dbconfig';

/**
 * The schema of the employmentContract table
 * @name employmentContractSchema
 * @type {mongoose.Schema}
 */
export const employmentContractSchema: mongoose.Schema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    user_id: {
        ref: DBConfig.USER_MODEL_PROVIDER,
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    startDate_exact: {
        type: Date,
        required: false,
    },
    startDate_string: {
        type: String,
        required: false,
    },
    endDate_exact: {
        type: Date,
        required: false,
    },
    endDate_string: {
        type: String,
        required: false,
    }
});