/**
 * This implements the ConversationHistoryParameters interface
 * @interface ConversationHistoryParametersInterface
 */
export interface ConversationHistoryParametersInterface {

    /**
     * The name of the parameter
     * @name ConversationHistoryParametersInterface#name
     * @type {string}
     */
    readonly name: string;

    /**
     * The value of the parameter
     * @name ConversationHistoryParametersInterface#value
     * @type {string}
     */
    readonly value: string;

}