import { IntentHandler } from './../handlers/handler.abstract';
import { ChooseContractByNameIntentHandler } from '../handlers/handler.choosecontractbyname';
import { IIntentFactory } from './factory.interface';
import { Injectable } from '@nestjs/common';
import IntentConfig from './../IntentConfig';
import { DIALOGFLOW_INTENT_IDS } from '../../dialog-flow/dialogflow-structure';

/**
 * A Factory to handle a specific follow-up intent
 */
@Injectable()
export class ChooseContractByNameFactory implements IIntentFactory {

    constructor(private chooseContractByNameIntentHandler: ChooseContractByNameIntentHandler) {
    }

    /**
     * Gets the IntentHandler
     * @returns {IntentHandler} The IntentHandler instance
     */
    createIntentHandler(): IntentHandler {
        return this.chooseContractByNameIntentHandler;
    }

    /**
     * Whether this IntentFactory applies to the intent
     * @param {string} intentID The intent's ID
     * @returns {boolean} Returns whether this factory applies
     */
    appliesTo(intentID: string): boolean {
        return (intentID === IntentConfig.INTENT_PREFIX + DIALOGFLOW_INTENT_IDS.Contract_ChooseContractByName);
    }
}