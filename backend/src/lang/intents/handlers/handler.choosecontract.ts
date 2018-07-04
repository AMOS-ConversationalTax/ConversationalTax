import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';

/**
 * Class to handle a specific follow-up Intent
 */
@Injectable()
export class ChooseContractIntentHandler extends IntentHandler{

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
            let text: string = '';
            // Get the position given by the user
            const parameter: any = intentData.parameter;
            const position: number = parameter.fields.Number.numberValue;
            // const position: number = parameter.fields.Number.valueOf();
            const contract = contracts[position];
            text += answer + ' Der ausgewählte Vertrag lautet ' + contract.name;
            return { text };
        }
        return undefined;
    }
}