import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';

/**
 * Class to handle the abort Intent
 */
@Injectable()
export class AbortIntentHandler extends IntentHandler{

    constructor(){
        super();
    }

    /**
     * Proccesses a given DialogFlow Reponse
     * @param {IIntentData} intentData Parts of the DialogFlow response
     * @returns {Promise<undefined>} The text for the user or undefined.
     */
    public async handle(intentData: IIntentData): Promise<undefined> {

        return undefined;

    }
}