import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';
import { UserService } from 'database/user/user.service';

/**
 * Class to handle a specific Intent
 */
@Injectable()
export class CreateContractIntentHandler extends IntentHandler{

    constructor(private employmentContractService: EmploymentContractService, private userService: UserService){
        super();
    }

    /**
     * Proccesses a given DialogFlow Reponse
     * @param {IIntentData} intentData Parts of the DialogFlow response
     * @returns {Promise<ReturnText | undefined>} The text for the user or undefined.
     */
    public async handle(intentData: IIntentData): Promise<ReturnText | undefined> {

        if (intentData.allParameterSet) {

            try {

                if (!await this.userService.exists(intentData.user)) {

                    await this.userService.create(intentData.user);

                }

                const contractName: string = this.extractData(intentData.parameter, 'ContractName', 'ContractName');
                const date: string = this.extractData(intentData.parameter, 'StartDate', 'StartDate');

                const employmentContract: string = await this.employmentContractService.create(intentData.user);

                await this.employmentContractService.editName(employmentContract, contractName);

                if (typeof date === 'string' && date.length > 0) {

                    await this.employmentContractService.editStartDateExact(employmentContract, new Date(date));

                }

            } catch {

                return {text: 'Beim Anlegen deines Vertrages ist ein Fehler aufgetreten.'};

            }

        }

        return undefined;
    }
}