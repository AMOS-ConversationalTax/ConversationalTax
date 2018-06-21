import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';

@Injectable()
export class EndDateIntentHandler extends IntentHandler{

    constructor(private employmentContractService: EmploymentContractService){
        super();
    }

    /**
     * Proccesses a given DialogFlow Reponse
     * @param intentData Parts of the DialogFlow response
     * @returns {Promise<ReturnText | undefined>} The text for the user or undefined.
     */
    public async handle(intentData: IIntentData): Promise<ReturnText | undefined> {
        if (intentData.allParameterSet) {

            const contractName = this.extractData(intentData.parameter, 'ContractName', 'ContractName');
            const date = this.extractData(intentData.parameter, 'EndDate', 'EndDate');

            const employmentContract =
                this.employmentContractService.findEmploymentContractsOfUserByName(intentData.user, contractName);

            employmentContract.then( (data) => {
                this.employmentContractService.editEndDateExact(data[0]._id, date);
            });
        }

        return undefined;
    }
}