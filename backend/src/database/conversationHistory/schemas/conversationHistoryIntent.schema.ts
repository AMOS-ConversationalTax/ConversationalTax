import * as mongoose from 'mongoose';

/**
 * The schema of the conversationHistoryIntent SubDocument
 * @name conversationHistoryIntentSchema
 * @type {mongoose.Schema}
 */
export const conversationHistoryIntentSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
});