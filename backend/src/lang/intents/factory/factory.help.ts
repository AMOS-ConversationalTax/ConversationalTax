import { IntentHandler } from './../handlers/handler.abstract';
import { HelpIntentHandler } from '../handlers/handler.help';
import { IIntentFactory } from './factory.interface';
import { Injectable } from '@nestjs/common';
import IntentConfig from './../IntentConfig';

@Injectable()
export class HelpFactory implements IIntentFactory {

    constructor(private helpIntentHandler: HelpIntentHandler) {
    }

    /**
     * Gets the IntentHandler
     * @returns {IntentHandler} The IntentHandler instance
     */
    createIntentHandler(): IntentHandler {
        return this.helpIntentHandler;
    }

    /**
     * Whether this IntentFactory applies to the intent
     * @param intentID The intent's ID
     * @returns {boolean}
     */
    appliesTo(intentID: string): boolean {
        return (intentID === IntentConfig.INTENT_PREFIX + 'e695c10c-0a85-4ede-a899-67f264ff5275');
    }
}