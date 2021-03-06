import { Injectable } from '@nestjs/common';
import { EmploymentContractService } from '../database/employmentContract/employmentContract.service';
import { DialogFlowService } from '../lang/dialog-flow/dialog-flow.service';
import { EmploymentContract } from '../database/employmentContract/interfaces/employmentContract.interface';

/**
 * A connector class for the database service and the dialog-flow service
 */
@Injectable()
export class DatabaseDialogFlowService {

    /**
     * The constructor for the DatabaseDialogFlowService
     * @param {EmploymentContractService} employmentContractService An EmploymentContractService - injected by DI
     */
    constructor( private employmentContractService: EmploymentContractService ) {}

    /**
     * Updates the employment contract session entity
     * @param {string} u_id An id for identifing the user
     * @param {DialogFlowService} dialogFlowService A reference to a dialogFlowService object to avoid circlic dependencies
     * @returns {Promise<boolean>} A Promise containting the success of the update
     */
    public async updateEmploymentContractSessionEntity(u_id: string, dialogFlowService: DialogFlowService): Promise<boolean> {

        // Initialize the return array
        const sessionEntities = new Array<SessionEntity>();

        // Get all EmploymentContracts of the user
        const employmentContracts: EmploymentContract[] = await this.employmentContractService.findEmploymentContractsOfUser(u_id);

        for ( const contract of employmentContracts ) {

            // Generate the suiting session entity
            const sessionEntity: SessionEntity = {
                value: contract._id,
                synonyms: [
                    contract._id,
                ],
            };

            if (contract.name !== undefined) {

                sessionEntity.synonyms.push(contract.name);

            }

            // Push the session entity into the other session entities
            sessionEntities.push(sessionEntity);

        }

        // Set session entities at dialogflow
        return dialogFlowService.createSessionEntityType( 'EmploymentContract', sessionEntities, u_id );

    }

}