import { IntentHandler } from './../handlers/handler.abstract';
import { IIntentFactory } from './factory.interface';
import { Injectable } from '@nestjs/common';
import IntentConfig from './../IntentConfig';
import { DIALOGFLOW_INTENT_IDS } from '../../dialog-flow/dialogflow-structure';
import { WhatToDoIntentHandler } from '../handlers/handler.whatToDo';

/**
 * A Factory to handle a specific intent
 */
@Injectable()
export class WhatToDoFactory implements IIntentFactory {

    constructor(private whatToDoIntentHandler: WhatToDoIntentHandler) {
    }

    /**
     * Gets the IntentHandler
     * @returns {IntentHandler} The IntentHandler instance
     */
    createIntentHandler(): IntentHandler {
        return this.whatToDoIntentHandler;
    }

    /**
     * Whether this IntentFactory applies to the intent
     * @param {string} intentID The intent's ID
     * @returns {boolean} Returns whether this factory applies
     */
    appliesTo(intentID: string): boolean {
        return (intentID === IntentConfig.INTENT_PREFIX + DIALOGFLOW_INTENT_IDS.WhatToDo);
    }
}