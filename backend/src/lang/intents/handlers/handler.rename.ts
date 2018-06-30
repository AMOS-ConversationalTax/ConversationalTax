import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';

/**
 * Class to handle a specific Intent
 */
@Injectable()
export class RenameIntentHandler extends IntentHandler{

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

                const id: string = this.extractData(intentData.parameter, 'EmploymentContract', 'EmploymentContract');
                const newName: string = this.extractData(intentData.parameter, 'NewContractName', 'NewContractName');

                await this.employmentContractService.editName(id, newName);

            } catch {

                return {text: 'Beim Ändern des Vertragsnamens ist ein Fehler aufgetreten.'};
                
            }

        }

        return undefined;
    }
}