import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { FuzzyDateMappingService, FuzzyDateReturn } from '../parametermappings/fuzzydatemapping.service';
import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';

/**
 * Class to handle a specific Intent
 */
@Injectable()
export class AddStartDateIntentHandler extends IntentHandler{

    constructor(private employmentContractService: EmploymentContractService, private fuzzyDateMappingService: FuzzyDateMappingService){
        super();
    }

    /**
     * Proccesses a given DialogFlow Reponse
     * @param {IIntentData} intentData Parts of the DialogFlow response
     * @returns {Promise<ReturnText | undefined>} The text for the user or undefined.
     */
    public async handle(intentData: IIntentData): Promise<ReturnText | undefined> {
        try {
            if (intentData.allParameterSet) {

                // Extract the parameters
                const parameter: any = intentData.parameter;
                const contractName: string = parameter.fields.EmploymentContract.stringValue;

                // Start Date is always a structValue
                const date = parameter.fields.StartDate.structValue;

                // If a date was recognized as an exact date, startDate has the property 'StartDateAsDate'
                if ( date.fields.hasOwnProperty('StartDateAsDate') ) {

                    // Although start date is recognized as a date, the value is present in stringValue
                    const startDateExact: any = date.fields.StartDateAsDate.stringValue;

                    await this.employmentContractService.editStartDateExact(contractName, startDateExact);

                    // If set was successfull we want to remove a possibly existing startDateString
                    await this.employmentContractService.deleteStartDateString(contractName);

                // If a date was recognized as an fuzzy date, startDate has the property 'StartDateAsFuzzyDate'
                } else if ( date.fields.hasOwnProperty('StartDateAsFuzzyDate') ) {

                    // Use fuzzyDateMapping
                    const fuzzyDate: FuzzyDateReturn =
                            this.fuzzyDateMappingService.mapFuzzyDate(new Date(),
                                                                      date.fields.StartDateAsFuzzyDate.structValue);

                    await this.employmentContractService.editStartDateExact(contractName, fuzzyDate.date);
                    await this.employmentContractService.editStartDateString(contractName, fuzzyDate.name);

                // If a date was not recognized as an exact date or fuzzy date, startDate has the property 'StartDateAsDate'
                } else if ( date.fields.hasOwnProperty('StartDateAsString') ) {

                    // The value of startDate is present in stringValue
                    const startDateString: any = date.fields.StartDateAsString.stringValue;

                    await this.employmentContractService.editStartDateString(contractName, startDateString);

                    // If set was successfull we want to remove a possibly existing startDateExact
                    await this.employmentContractService.deleteStartDateExact(contractName);

                }

                return undefined;
            }
        } catch {
            return { text: 'Beim Ändern des Startdatums ist ein Fehler aufgetreten. Bitte versuche es erneut' };
        }
    }
}