import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';
import { EmploymentContract } from './../../../database/employmentContract/interfaces/employmentContract.interface';

/**
 * Class to handle a specific Intent
 */
@Injectable()
export class DeleteContractIntentHandler extends IntentHandler{

    constructor(private employmentContractService: EmploymentContractService){
        super();
    }

    /**
     * Proccesses a given DialogFlow Reponse
     * @param {IIntentData} intentData Parts of the DialogFlow response
     * @returns {Promise<ReturnText | undefined>} The text for the user or undefined.
     */
    public async handle(intentData: IIntentData): Promise<ReturnText | undefined> {

        if (intentData.allParameterSet) {

            try {

                const contractID: string = this.extractData(intentData.parameter, 'EmploymentContract', 'EmploymentContract');

                await this.employmentContractService.deleteEmploymentContract(contractID);

            } catch {

                return {text: 'Beim löschen deines Vertrages ist ein Fehler aufgetreten.'};

            }

        }

        return undefined;
    }
}