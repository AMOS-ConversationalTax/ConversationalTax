import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';

/**
 * Class to handle a specific follow-up Intent
 */
@Injectable()
export class ChooseContractByNameIntentHandler extends IntentHandler{

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
            const userID = intentData.user.toString();
            // Get the list of all contracts
            const contracts = await this.employmentContractService.findEmploymentContractsOfUser(userID);
            // Get the Answer from Dialogflow
            const answer: string = intentData.fulfillmentText;
            let text: string = 'Der Vertrag wurde leider nicht gefunden.';
            // Get the contract name given by the user
            const parameter: any = intentData.parameter;
            const chosenContractName: string = parameter.fields.ContractName.stringValue;
            // search for the first entry in the list. if a match was found this contract is chosen
            for(let i = 0; i < contracts.length; i++) {
                if(chosenContractName === contracts[i].name) {
                    text = answer + ' Der ausgewählte Vertrag lautet ' + contracts[i].name;
                    continue;
                }
            }
            return { text };
        }
        return undefined;
    }
}