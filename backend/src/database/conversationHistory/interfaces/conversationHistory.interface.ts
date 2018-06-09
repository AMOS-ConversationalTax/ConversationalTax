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
     * The (recognized) input text of the user
     * @name ConversationHistory#queryText
     * @type {string}
     */
    readonly queryText: string;

    /**
     * The fulfillment text answer of dialogflow
     * @name ConversationHistory#fulfillmentText
     * @type {string}
     */
    readonly fulfillmentText: string;

    /**
     * Are all required parameters detected
     * @name ConversationHistory#allRequiredParamsPresent
     * @type {string}
     */
    readonly allRequiredParamsPresent: boolean;

    /**
     * The URL of the detected intent
     * @name ConversationHistory#intent
     * @type {string}
     */
    readonly intent: string;

    /**
     * Detected parameters as json string
     * @name ConversationHistory#parameters
     * @type {string}
     */
    readonly parameters: string;

    /**
     * The timestamp of the ConversationHistory entry
     * @name ConversationHistory#timestamp
     * @type {Date}
     */
    readonly timestamp: Date;
}