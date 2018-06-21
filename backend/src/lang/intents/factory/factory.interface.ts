import { IntentHandler } from './../handlers/handler.abstract';

/**
 * Abstrakt Factory pattern. Inteface for the factories.
 */
export interface IIntentFactory {
    /**
     * Gets the IntentHandler
     * @returns {IntentHandler} The IntentHandler instance
     */
    createIntentHandler(): IntentHandler;

    /**
     * Whether this IntentFactory applies to the intent
     * @param intentID The intent's ID
     * @returns {boolean}
     */
    appliesTo(intentID: string): boolean;
}
