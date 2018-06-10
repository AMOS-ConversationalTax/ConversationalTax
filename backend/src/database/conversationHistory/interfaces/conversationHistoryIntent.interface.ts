import { Document } from 'mongoose';

/**
 * This implements the ConversationHistoryIntent interface used by ConversationHistory
 * @interface ConversationHistoryIntent
 */
export interface ConversationHistoryIntent extends Document {

    /**
     * The name of the intent
     * @name  ConversationHistoryIntent#name
     * @type {string}
     */
    readonly name: string;

    /**
     * The displayName of the intent
     * @name  ConversationHistoryIntent#displayName
     * @type {string}
     */
    readonly displayName: string;

}