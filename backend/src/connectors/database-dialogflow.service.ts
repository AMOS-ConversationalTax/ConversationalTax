import { Injectable } from '@nestjs/common';
import { EmploymentContractService } from '../database/employmentContract/employmentContract.service';
import { SessionEntity } from '../lang/dialog-flow.dto';
import { EmploymentContract } from '../database/employmentContract/interfaces/employmentContract.interface';

/**
 * A connector class for the database service and the dialog-flow service
 */
@Injectable()
export class DatabaseDialogFlowService {

    constructor(private employmentContractService: EmploymentContractService) {}

    /**
     * Returns all exisiting contracts of an user 
     * in form of an Session Entity (ready for DialogFlow)
     *
     * @param {string} u_id
     * An id for identifing the user
     *
     * @returns {Promise<Array<SessionEntity>>}
     * A Promise containting all current employment contracts of the user 
     * 
     */
    public async getExistingContractsOfUser(u_id: string): Promise<Array<SessionEntity>> {

        // Initialize the return array
        var sessionEntities = new Array<SessionEntity>();

        // Get all EmploymentContracts of the user
        const employmentContracts: EmploymentContract[] = 
                await this.employmentContractService.findEmploymentContractsOfUser(u_id);

        for(var i = 0; i < employmentContracts.length; i++) {
           
            // Generate the suiting session entity
            var sessionEntity: SessionEntity = new SessionEntity();
            sessionEntity.value =  employmentContracts[i].name;
            sessionEntity.synonyms.push(employmentContracts[i].name);

            // Push the session entity into the other session entities
            sessionEntities.push(sessionEntity);

        }

        return sessionEntities;

    }
    
}