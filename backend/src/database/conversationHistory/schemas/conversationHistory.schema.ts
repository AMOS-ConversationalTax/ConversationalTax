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
    queryText: {
        type: String,
        required: true,
    },
    fulfillmentText: {
        type: String,
        required: true,
    },
    allRequiredParamsPresent: {
        type: Boolean,
        required: true,
    },
    intent: {
        type: String,
        required: true,
    },
    parameters: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
});