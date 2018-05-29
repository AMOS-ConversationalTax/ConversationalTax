import { Injectable } from '@nestjs/common';
import { EmploymentContractService } from '../database/employmentContract/employmentContract.service';
import { DialogFlowService } from '../lang/dialog-flow.service';
import { SessionEntity } from '../lang/dialog-flow.dto';
import { EmploymentContract } from '../database/employmentContract/interfaces/employmentContract.interface';

/**
 * A connector class for the database service and the dialog-flow service
 */
@Injectable()
export class DatabaseDialogFlowService {

    constructor(private dialogFlowService: DialogFlowService) {}

    /**
     * Returns all exisiting contracts of an user
     * in form of an Session Entity (ready for DialogFlow)
     *
     * @param {string} u_id
     * An id for identifing the user
     * 
     * @param {EmploymentContractService} employmentContractService
     * The suiting employmentContractService
     * 
     * @returns {Promise<Array<SessionEntity>>}
     * A Promise containting all current employment contracts of the user
     *
     */
    public async getExistingContractsOfUser(employmentContractService: EmploymentContractService, u_id: string): Promise<Array<SessionEntity>> {

        // Initialize the return array
        const sessionEntities = new Array<SessionEntity>();

        // Get all EmploymentContracts of the user
        const employmentContracts: EmploymentContract[] = await employmentContractService.findEmploymentContractsOfUser(u_id);

        for ( const contract of employmentContracts ) {

            // Generate the suiting session entity
            const sessionEntity: SessionEntity = new SessionEntity();
            sessionEntity.value =  contract.name;
            sessionEntity.synonyms.push(contract.name);

            // Push the session entity into the other session entities
            sessionEntities.push(sessionEntity);

        }

        return sessionEntities;

    }

    /**
     * If an EmploymentContractService is updated it is necessary to report this update to this service
     *
     * @param {string} u_id
     * An id for identifing the user which was updated
     * 
     * @param {EmploymentContractService} employmentContractService
     * The reporting employmentContractService
     * 
     * @returns {Promise<Boolean>}
     * A Promise containting the success of the update
     *
     */
    public async updatedEmploymentContracts(employmentContractService: EmploymentContractService, u_id: string): Promise<Boolean> {

        if(! this.dialogFlowService.createSessionEntityType(   "EmploymentContracts",
                                    await this.getExistingContractsOfUser(employmentContractService, u_id),
                                    u_id)) {
            return false;
        }

        return true;

    }

}