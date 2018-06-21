import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';

@Injectable()
export class EndDateIntentHandler extends IntentHandler{

    private contractName: string;
    private date: Date;

    constructor(private employmentContractService: EmploymentContractService){
        super();
    }

    public async handle(intentData: IIntentData): Promise<ReturnText | undefined> {
        if (intentData.allParameterSet) {

            this.contractName = this.extractData(intentData.parameter, 'ContractName', 'ContractName');
            this.date = this.extractData(intentData.parameter, 'EndDate', 'EndDate');

            const employmentContract =
                this.employmentContractService.findEmploymentContractsOfUserByName(intentData.user, this.contractName);

            employmentContract.then( (data) => {
                this.employmentContractService.editEndDateExact(data[0]._id, this.date);
            });
        }

        return undefined;
    }
}