import { Injectable } from '@nestjs/common';
import { EmploymentContractService } from '../../database/employmentContract/employmentContract.service';
import { EmploymentContract } from '../../database/employmentContract/interfaces/employmentContract.interface';

/**
 * Provides the list of all Contracts of a certain user.
 */
@Injectable()
export class ListAllContractsService {

    constructor (private employmentContractService: EmploymentContractService){}

    async getAllContracts(userID: string): Promise<Array<EmploymentContract>> {
        const contracts = await this.employmentContractService.findEmploymentContractsOfUser(userID);
        return contracts;
    }

    async getContractOfId(contractID: string): Promise<Array<EmploymentContract>> {
        const contract = await this.employmentContractService.findEmploymentContract(contractID);
        return contract;
    }
}