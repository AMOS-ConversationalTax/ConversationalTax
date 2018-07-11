import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';

/**
 * Class to handle a specific Intent
 */
@Injectable()
export class ListAllContractsIntentHandler extends IntentHandler{

    constructor(private employmentContractService: EmploymentContractService){
        super();
    }

    /**
     * Proccesses a given DialogFlow Reponse
     * @param {IIntentData} intentData Parts of the DialogFlow response
     * @returns {Promise<ReturnText | undefined>} The text for the user or undefined.
     */
    public async handle(intentData: IIntentData): Promise<ReturnText | undefined> {

        const userID = intentData.user.toString();
        // Get the list of all contracts
        const contracts = await this.employmentContractService.findEmploymentContractsOfUser(userID);
        // if the user has no contracts then return
        if (contracts.length === 0) {
            return { text : 'Du hast leider noch keine Verträge abgeschlossen.' };
        }
        // Get the Answer from Dialogflow
        let answer: string = '';
        answer = intentData.fulfillmentText;
        // Combine the answer with the enumerated list as strings and return it
        let text: string = answer;
        for (let index = 0; index < contracts.length; index++) {
            if (index === contracts.length - 1) {
                text += ' und';
            }
            text += ' ' + contracts[index].name;
        }

        return { text };
    }
}