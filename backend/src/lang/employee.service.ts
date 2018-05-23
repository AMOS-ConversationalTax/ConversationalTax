import { DialogFlowService } from './dialog-flow.service';
import { EmploymentContractService } from './../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';

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
    public processEmployeeContract(detectIntent: DetectIntentResponse) {
        const responseAction = this.dialogFlowService.extractAction(detectIntent);
        const responseParam = this.dialogFlowService.extractParameter(detectIntent)[this.fieldsString][responseAction];
        console.log(JSON.stringify(responseParam));
        if (responseAction === 'VertragsName')
        {
            this.setContractName(responseParam);
        }
        if (responseAction === 'VertragMitDatum')
        {
            this.createContractWithDate(responseParam);
        }
        if (responseAction === 'EndDatum')
        {
            this.setEndDate(responseParam);
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