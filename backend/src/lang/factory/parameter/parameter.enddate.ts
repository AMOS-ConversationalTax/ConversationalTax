import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { ParameterHandler } from './parameter.abstract';
import { ParameterHelper } from './parameter.parser';

export class EndDateParameterHandler extends ParameterHandler{

    private contractName: string;
    private date: Date;

    constructor(private employmentContractService: EmploymentContractService){
        super();
    }

    public handle(parameterData: IParameterData) {
        if (parameterData.allParameterSet) {
            const pathDate = this.getParameterPath('EndDate');
            let pathName = this.getCustomParameterPath('ContractName', 'ContractName');
            this.contractName = ParameterHelper.extractData(parameterData.parameter, pathName);
            if (this.contractName === null) {
                pathName = this.getParameterPath('ContractName');
                this.contractName = ParameterHelper.extractData(parameterData.parameter, pathName);
            }

            this.date = ParameterHelper.extractData(parameterData.parameter, pathDate);

            const employmentContract =
                this.employmentContractService.findEmploymentContractsOfUserByName(parameterData.user, this.contractName);

            employmentContract.then( (data) => {
                this.employmentContractService.editEndDateExact(data[0]._id, this.date);
            });
        }
    }
}