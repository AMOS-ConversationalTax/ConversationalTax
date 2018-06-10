import { ConversationHistoryParametersInterface } from './ConversationHistoryParameters.interface';
import { ConversationHistoryIntent } from './conversationHistoryIntent.interface';

/**
 * This implements the ConversationHistory interface
 * @interface ConversationHistoryInterface
 */
export interface ConversationHistoryInterface {

    /**
     * The id of the ConversationHistory entry
     * @name ConversationHistoryInterface#_id
     * @type {string}
     */
    readonly _id: string;

    /**
     * The id of user owning the ConversationHistory entry
     * @name ConversationHistoryInterface#user_id
     * @type {string}
     */
    readonly user_id: string;

    /**
     * The (recognized) query of the user in text form
     * @name ConversationHistoryInterface#query
     * @type {string}
     */
    readonly query: string;

    /**
     * The text answer of dialogflow
     * @name ConversationHistoryInterface#answer
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
     * @name ConversationHistoryInterface#parameters
     * @type {Array<ConversationHistoryParameters>}
     */
    readonly parameters: Array<ConversationHistoryParametersInterface>;

    /**
     * The timestamp of the ConversationHistory
     * @name ConversationHistoryInterface#timestamp
     * @type {Date}
     */
    readonly timestamp: Date;

}