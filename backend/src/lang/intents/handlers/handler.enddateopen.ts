import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';

@Injectable()
export class EndDateOpenIntentHandler extends IntentHandler{

    private contractName: string;

    constructor(private employmentContractService: EmploymentContractService){
        super();
    }

    public async handle(intentData: IIntentData) {
        try {
            this.contractName = this.extractData(intentData.parameter, 'EmploymentContract', 'EmploymentContract');

            // If our parameters are not ready Dialogflow will ask for them
            if (this.contractName !== '') {
                await this.employmentContractService.editEndDateString(this.contractName, 'unbefristet');
            }
            return undefined;
          } catch (error) {
            return { text: 'Beim Ändern des Enddatums ist ein Fehler aufgetreten. Bitte versuche es erneut' };
          }
    }
}