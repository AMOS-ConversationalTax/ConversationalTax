import * as mongoose from 'mongoose';
import DBConfig from '../../dbconfig';
import { conversationHistoryParametersSchema } from './conversationHistoryParameters.schema';

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
    query: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    intent: {
        type: String,
        required: true,
    },
    parameters: {
        type: [conversationHistoryParametersSchema],
        required: true,
    },
    timestamp: {
        type: Date,
        required: false,
    },
});