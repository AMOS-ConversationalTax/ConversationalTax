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
            let pathName = this.getCustomParameterPath('ContractName', 'ContractName');
            this.contractName = ParameterHelper.extractData(parameterData.parameter, pathName);
            if (this.contractName === null) {
                pathName = this.getParameterPath('ContractName');
                this.contractName = ParameterHelper.extractData(parameterData.parameter, pathName);
            }

            this.startDate = ParameterHelper.extractData(parameterData.parameter, pathDate);
            
            const id = this.employmentContractService.create(parameterData.user);

            id.then( (idData) => {
                this.employmentContractService.editName(idData, this.contractName).then( () => {
                    this.employmentContractService.editStartDateExact(idData, this.startDate);
                });
            });
        }
    }
}