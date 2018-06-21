import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';
import { UserService } from 'database/user/user.service';

@Injectable()
export class AddStartDateIntentHandler extends IntentHandler{

    private contractName: string;
    private date: any;

    constructor(private employmentContractService: EmploymentContractService){
        super();
    }

    public async handle(intentData: IIntentData): Promise<ReturnText | undefined> {
        try {
            if (intentData.allParameterSet) {

                this.contractName = this.extractData(intentData.parameter, 'EmploymentContract', 'EmploymentContract');
                // Start Date is always a structValue
                this.date = this.extractData(intentData.parameter, 'StartDate', 'StartDate');

                // If a date was recognized as an exact date, startDate has the property 'StartDateAsDate'
                if ( this.date.fields.hasOwnProperty('StartDateAsDate') ) {

                    // Although start date is recognized as a date, the value is present in stringValue
                    const startDateExact: any = this.date.fields.StartDateAsDate.stringValue;

                    await this.employmentContractService.editStartDateExact(this.contractName, startDateExact);

                    // If set was successfull we want to remove a possibly existing startDateString
                    await this.employmentContractService.deleteStartDateString(this.contractName);

                // If a date was not recognized as an exact date, startDate has the property 'StartDateAsDate'
                } else if ( this.date.fields.hasOwnProperty('StartDateAsString') ) {

                    // The value of startDate is present in stringValue
                    const startDateString: any = this.date.fields.StartDateAsString.stringValue;

                    await this.employmentContractService.editStartDateString(this.contractName, startDateString);

                    // If set was successfull we want to remove a possibly existing startDateExact
                    await this.employmentContractService.deleteStartDateExact(this.contractName);
                }

                return undefined;
            }
          } catch (error) {
            return { text: 'Beim Ändern des Startdatums ist ein Fehler aufgetreten. Bitte versuche es erneut' };
          }
    }
}