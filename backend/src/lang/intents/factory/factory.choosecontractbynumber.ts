import { IntentHandler } from './../handlers/handler.abstract';
import { ChooseContractByNumberIntentHandler } from '../handlers/handler.choosecontractbynumber';
import { IIntentFactory } from './factory.interface';
import { Injectable } from '@nestjs/common';
import IntentConfig from './../IntentConfig';
import { DIALOGFLOW_INTENT_IDS } from '../../dialog-flow/dialogflow-structure';

/**
 * A Factory to handle a specific follow-up intent
 */
@Injectable()
export class ChooseContractByNumberFactory implements IIntentFactory {

    constructor(private chooseContractByNumberIntentHandler: ChooseContractByNumberIntentHandler) {
    }

    /**
     * Gets the IntentHandler
     * @returns {IntentHandler} The IntentHandler instance
     */
    createIntentHandler(): IntentHandler {
        return this.chooseContractByNumberIntentHandler;
    }

    /**
     * Whether this IntentFactory applies to the intent
     * @param {string} intentID The intent's ID
     * @returns {boolean} Returns whether this factory applies
     */
    appliesTo(intentID: string): boolean {
        return (intentID === IntentConfig.INTENT_PREFIX + DIALOGFLOW_INTENT_IDS.Contract_ChooseContractByNumber);
    }
}