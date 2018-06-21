import { IntentHandler } from './../handlers/handler.abstract';
import { EndDateOpenIntentHandler } from '../handlers/handler.enddateopen';
import { IIntentFactory } from './factory.interface';
import { Injectable } from '@nestjs/common';
import IntentConfig from './../IntentConfig';

@Injectable()
export class EndDateOpenFactory implements IIntentFactory {

    constructor(private endDateOpenIntentHandler: EndDateOpenIntentHandler) {
    }

    /**
     * Gets the IntentHandler
     * @returns {IntentHandler} The IntentHandler instance
     */
    createIntentHandler(): IntentHandler {
        return this.endDateOpenIntentHandler;
    }

    /**
     * Whether this IntentFactory applies to the intent
     * @param intentID The intent's ID
     * @returns {boolean}
     */
    appliesTo(intentID: string): boolean {
        return (intentID === IntentConfig.INTENT_PREFIX + 'd1523cf3-bb4d-47cb-8fc4-bec3d669628e');
    }
}