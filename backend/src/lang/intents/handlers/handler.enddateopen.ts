import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';

/**
 * Class to handle a specific Intent
 */
@Injectable()
export class EndDateOpenIntentHandler extends IntentHandler{

    constructor(private employmentContractService: EmploymentContractService){
        super();
    }

    /**
     * Proccesses a given DialogFlow Reponse
     * @param {IIntentData} intentData Parts of the DialogFlow response
     * @returns {Promise<ReturnText | undefined>} The text for the user or undefined.
     */
    public async handle(intentData: IIntentData): Promise<ReturnText | undefined> {
        try {
            const contractName = this.extractData(intentData.parameter, 'EmploymentContract', 'EmploymentContract');

            // If our parameters are not ready Dialogflow will ask for them
            if (contractName !== '') {
                await this.employmentContractService.editEndDateString(contractName, 'unbefristet');
            }
            return undefined;
          } catch (error) {
            return { text: 'Beim Ändern des Enddatums ist ein Fehler aufgetreten. Bitte versuche es erneut' };
          }
    }
}