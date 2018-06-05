import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { ParameterHandler } from './parameter.abstract';
import { ParameterHelper } from './parameter.parser';

export class CreateStartDateParameterHandler extends ParameterHandler{

    private contractName: string;
    private startDate: Date;

    constructor(private employmentContractService: EmploymentContractService){
        super();
    }

    public handle(parameterData: IParameterData) {
        if (parameterData.allParameterSet) {
            const pathDate = this.getParameterPath('StartDate');
            const pathName = this.getCustomParameterPath('ContractName', 'ContractName');

            this.startDate = ParameterHelper.extractData(parameterData.parameter, pathDate);
            this.contractName = ParameterHelper.extractData(parameterData.parameter, pathName);

            const id = this.employmentContractService.create(parameterData.user);

            id.then( (idData) => {
                this.employmentContractService.editName(idData, this.contractName).then( () => {
                    this.employmentContractService.editStartDateExact(idData, this.startDate);
                });
            });
        }
    }
}