import { Document } from 'mongoose';

/**
 * This implements the ConversationHistoryParameters interface used by ConversationHistory
 * @interface ConversationHistoryParameters
 */
export interface ConversationHistoryParameters extends Document {

    /**
     * The name of the parameter
     * @name ConversationHistoryParameters#name
     * @type {string}
     */
    readonly name: string;

    /**
     * The value of the parameter
     * @name ConversationHistoryParameters#value
     * @type {string}
     */
    readonly value: string;

}