import { Document } from 'mongoose';
import { ConversationHistoryParameters } from './conversationHistoryParameters.interface';
import { ConversationHistoryIntent } from './conversationHistoryIntent.interface';

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
     * The (recognized) query of the user in text form
     * @name ConversationHistory#query
     * @type {string}
     */
    readonly query: string;

    /**
     * The text answer of dialogflow
     * @name ConversationHistory#answer
     * @type {string}
     */
    readonly answer: string;

    /**
     * The detected intent
     * @name ConversationHistory#intent
     * @type {ConversationHistoryIntent}
     */
    readonly intent: ConversationHistoryIntent;

    /**
     * The action computed by Dialogflow
     * @name ConversationHistory#action
     * @type {string}
     */
    readonly action: string;

    /**
     * The detected parameters
     * @name ConversationHistory#parameters
     * @type {Array<ConversationHistoryParameters>}
     */
    readonly parameters: Array<ConversationHistoryParameters>;

    /**
     * The timestamp of the ConversationHistory
     * @name ConversationHistory#timestamp
     * @type {Date}
     */
    readonly timestamp: Date;
}