import * as mongoose from 'mongoose';
import DBConfig from '../../dbconfig';

/**
 * The schema of the reminder table
 * @name reminderSchema
 * @type {mongoose.Schema}
 */
export const reminderSchema: mongoose.Schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    user_id: {
        ref: DBConfig.USER_MODEL_PROVIDER,
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});