import * as mongoose from 'mongoose';
import DBConfig from '../../dbconfig';

/**
 * The schema of the conversationHistoryParameters SubDocument
 * @name conversationHistoryParametersSchema
 * @type {mongoose.Schema}
 */
export const conversationHistoryParametersSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});