import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';
import { EmploymentContract } from 'database/employmentContract/interfaces/employmentContract.interface';

/**
 * Class to handle a specific follow-up Intent
 */
@Injectable()
export class ChooseContractByNumberIntentHandler extends IntentHandler{

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
            // if the user has no contracts then return
            if (contracts.length === 0) {
                return undefined;
            }
            // Get the Answer from Dialogflow
            const answer: string = intentData.fulfillmentText;
            // Get the position given by the user
            const parameter: any = intentData.parameter;
            // In Dialogflow the parameter type @sys.number is represented by "numberValue"
            const position: number = parameter.fields.Number.numberValue - 1;
            // Choose the right contract
            let contract: EmploymentContract = null;
            if (position < contracts.length) {
                contract = contracts[position];
                return { text: answer + ' Der ausgewählte Vertrag lautet ' + contract.name };
            }else{
                return { text: 'Der Vertrag wurde leider nicht gefunden.'};
            }
            
        }
        return undefined;
    }
}