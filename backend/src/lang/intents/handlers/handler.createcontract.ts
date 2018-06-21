import { EmploymentContractService } from './../../../database/employmentContract/employmentContract.service';
import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';
import { UserService } from 'database/user/user.service';

@Injectable()
export class CreateContractIntentHandler extends IntentHandler{

    constructor(private employmentContractService: EmploymentContractService, private userService: UserService){
        super();
    }

    public async handle(intentData: IIntentData): Promise<ReturnText | undefined> {
        if (!await this.userService.exists(intentData.user)) {
            this.userService.create(intentData.user);
          }
        await this.employmentContractService.create(intentData.user);
        return undefined;
    }
}