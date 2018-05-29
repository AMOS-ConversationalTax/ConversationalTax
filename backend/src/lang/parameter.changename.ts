import { EmploymentContractService } from 'database/employmentContract/employmentContract.service';
import { ParameterHandler } from './parameter.abstract';
import { ParameterHelper } from './parameter.parser';

export class ChangeNameParameterHandler extends ParameterHandler{

    private contractNameOld: string;
    private contractNameNew: string;

    constructor(private employmentContractService: EmploymentContractService){
        super();
    }

    public handle(parameterData: IParameterData) {
        if (parameterData.allParameterSet) {
            const pathNameOld = this.getCustomParameterPath('ContractName', 'ContractName');
            const pathNameNew = this.getCustomParameterPath('NewContractName', 'ContractName');

            this.contractNameOld = ParameterHelper.extractData(parameterData.parameter, pathNameOld);
            this.contractNameNew = ParameterHelper.extractData(parameterData.parameter, pathNameNew);

            const employmentContract =
                this.employmentContractService.findEmploymentContractsOfUserByName(parameterData.user, this.contractNameOld);

            employmentContract.then( (data) => {
                this.employmentContractService.editName(data[0]._id, this.contractNameNew);
            });
        }
    }
}