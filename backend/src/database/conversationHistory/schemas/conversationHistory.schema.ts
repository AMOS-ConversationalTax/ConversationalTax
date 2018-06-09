import * as mongoose from 'mongoose';
import DBConfig from '../../dbconfig';

/**
 * The schema of the conversationHistory table
 * @name conversationHistorySchema
 * @type {mongoose.Schema}
 */
export const conversationHistorySchema: mongoose.Schema = new mongoose.Schema({
    _id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    user_id: {
        ref: DBConfig.USER_MODEL_PROVIDER,
        type: String,
        required: true,
    },
    json_entry: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: false,
    },
});