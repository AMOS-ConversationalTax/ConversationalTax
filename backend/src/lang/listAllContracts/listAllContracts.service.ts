import { Injectable } from '@nestjs/common';
import { EmploymentContractService } from '../../database/employmentContract/employmentContract.service';
import { EmploymentContract } from '../../database/employmentContract/interfaces/employmentContract.interface';

/**
 * Provides the list of all Contracts of a certain user.
 */
@Injectable()
export class ListAllContractsService {

    private employmentContractService: EmploymentContractService;

    async getAllContracts(userID: string): Promise<EmploymentContract[]> {
        const contracts = await this.employmentContractService.findEmploymentContractsOfUser(userID);
        return contracts;
    }
}