import { DialogFlowService } from './dialog-flow.service';
import { EmploymentContractService } from './../database/employmentContract/employmentContract.service';

export default class EmployeeService {

    fieldsString = 'fields';
    structValueString = 'structValue';
    nameString = 'name';
    stringValueString = 'stringValue';

    constructor(private dialogFlowService: DialogFlowService,
                private employmentContractService: EmploymentContractService) {}

    /**
     * Processes the response of a users input in the context of an employment contract
     * @param {DetectIntentResponse} detectintent - The response received from dialogflow
     */
    public processEmployeeContract(detectIntent: DetectIntentResponse) {
        const responseAction = this.dialogFlowService.extractAction(detectIntent);
        const responseParam = this.dialogFlowService.extractParameter(detectIntent)[this.fieldsString][responseAction];
        if (responseAction === 'Vertragsname')
        {
            this.setContractName(responseParam);
        }
    }

    /**
     * Set the Name inside of an existing Contract - Uses right now a Hardcoded ID.
     * @param {object} responseParameter - All parameters extracted from the origin response
     */
    public setContractName(responseParameter: object) {
        if (responseParameter[this.structValueString] != null){
            const contractName = responseParameter[this.structValueString][this.fieldsString][this.nameString][this.stringValueString];
            this.employmentContractService.editName('5b046b1d9bc44048d059d12f', contractName);
        }
    }
}