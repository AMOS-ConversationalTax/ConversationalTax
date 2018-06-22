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
        if (!await this.userService.exists(intentData.user)) {
            this.userService.create(intentData.user);
        }
        await this.employmentContractService.create(intentData.user);
        return undefined;
    }
}