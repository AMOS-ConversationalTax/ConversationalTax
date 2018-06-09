import { Document } from 'mongoose';

/**
 * This implements the ConversationHistory interface used by ConversationHistoryService
 * @interface ConversationHistory
 */
export interface ConversationHistory extends Document {

    /**
     * The id of the ConversationHistory entry
     * @name ConversationHistory#_id
     * @type {string}
     */
    readonly _id: string;

    /**
     * The id of user owning the ConversationHistory entry
     * @name ConversationHistory#user_id
     * @type {string}
     */
    readonly user_id: string;

    /**
     * The ConversationHistory json entry
     * @name ConversationHistory#json_entry
     * @type {string}
     */
    readonly json_entry: string;

    /**
     * The timestamp of the ConversationHistory entry
     * @name ConversationHistory#timestamp
     * @type {Date}
     */
    readonly timestamp: Date;
}