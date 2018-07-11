import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';

/**
 * Class to handle the abort Intent
 */
@Injectable()
export class DefaultIntentHandler extends IntentHandler{

    constructor(){
        super();
    }

    /**
     * Proccesses a given DialogFlow Reponse
     * @param {IIntentData} intentData Parts of the DialogFlow response
     * @returns {Promise<ReturnText>} The text for the user or undefined.
     */
    public async handle(intentData: IIntentData): Promise<ReturnText> {
        if (typeof intentData.fulfillmentText === 'string' && intentData.fulfillmentText.length > 0) {
            return {text: intentData.fulfillmentText};
        }
        return {text: 'Ich bin nicht so sicher, ob ich dich richtig verstanden habe.'};
    }
}