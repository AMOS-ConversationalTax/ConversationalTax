import { DialogFlowService } from './../dialog-flow/dialog-flow.service';
import { EmploymentContractService } from './../../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';
import { ParameterHandler } from './../factory/parameter/parameter.abstract';
import { FactoryHelper } from './../factory/factory.helper';

@Injectable()
export class EmployeeService {

    fieldsString = 'fields';
    structValueString = 'structValue';
    nameString = 'name';
    stringValueString = 'stringValue';

    constructor(private dialogFlowService: DialogFlowService, private employmentContractService: EmploymentContractService) {}

    /**
     * Processes the response of a users input in the context of an employment contract
     * @param {DetectIntentResponse} detectintent - The response received from dialogflow
     */
    public processEmployeeContract(detectIntent: DetectIntentResponse, user_name: string) {
        const responseAction = this.dialogFlowService.extractAction(detectIntent);
        const factory = FactoryHelper.getFactoy(responseAction);
        if (factory !== null) {
            const responseParam = this.dialogFlowService.extractParameter(detectIntent);
            const allParamSet = this.dialogFlowService.extractReqParameterPresent(detectIntent);

            const parameterData: IParameterData = {parameter: responseParam, allParameterSet: allParamSet, user: user_name};
            const parameterHandler: ParameterHandler = factory.createParameterHandler();
            parameterHandler.handle(parameterData);
        }
    }
}