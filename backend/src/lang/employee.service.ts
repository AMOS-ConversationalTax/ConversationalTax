import { DialogFlowService } from './dialog-flow.service';
import { EmploymentContractService } from './../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';
import { ParameterHandler } from './parameter.abstract';
import { FactoryHelper } from './factory.helper';

@Injectable()
export class EmployeeService {

    fieldsString = 'fields';
    structValueString = 'structValue';
    nameString = 'name';
    stringValueString = 'stringValue';

    constructor(private dialogFlowService: DialogFlowService, private employmentContractService: EmploymentContractService) {}

    public test(){
        const data = this.employmentContractService.findEmploymentContractsOfUserByName('dummyBoy', 'nein');
        data.then((response) => {
            console.log(response[0].name);
        });
    }

    /**
     * Processes the response of a users input in the context of an employment contract
     * @param {DetectIntentResponse} detectintent - The response received from dialogflow
     */
    public processEmployeeContract(detectIntent: DetectIntentResponse, user_name: string) {
        const responseAction = this.dialogFlowService.extractAction(detectIntent);
        console.log('processEmployeeContract::responseAction' + responseAction);
        const factory = FactoryHelper.getFactoy(responseAction);
        if (factory !== null) {
            console.log('processEmployeeContract::factory not null');
            const responseParam = this.dialogFlowService.extractParameter(detectIntent);
            const allParamSet = this.dialogFlowService.extractReqParameterPresent(detectIntent);

            const parameterData: IParameterData = {parameter: responseParam, allParameterSet: allParamSet, user: user_name};
            const parameterHandler: ParameterHandler = factory.createParameterHandler();
            parameterHandler.handle(parameterData);
        }
    }

    /**
     * Set the Name inside of an existing Contract - Uses right now a hardcoded ID!!
     * @param {object} responseParameter - All parameters extracted from the origin response
     */
    public setContractName(responseParameter: object) {
        if (responseParameter[this.structValueString] != null){
            const contractName = responseParameter[this.structValueString][this.fieldsString][this.nameString][this.stringValueString];
            this.employmentContractService.editName('5b046b1d9bc44048d059d12f', contractName);
        }
    }

    /**
     * Set the exact end date inside of an existing Contract - Uses right now a hardcoded ID!!
     * @param {object} responseParameter - All parameters extracted from the origin response
     */
    public setEndDate(responseParameter: object) {
        if (responseParameter[this.stringValueString] != null){
            const contractDate = responseParameter[this.stringValueString];
            this.employmentContractService.editEndDateExact('5b046b1d9bc44048d059d12f', contractDate);
        }
    }

    /**
     * Creates a new contract with an exact starting date - Uses right now a hardcoded name!!
     * @param {object} responseParameter - All parameters extracted from the origin response
     */
    public createContractWithDate(responseParameter: object) {
        if (responseParameter[this.stringValueString] != null){
            const contractDate = responseParameter[this.stringValueString];
            const idPromise = this.employmentContractService.create('dummyGirl');
            idPromise.then((id) => this.employmentContractService.editStartDateExact(id , contractDate));
        }
    }
}