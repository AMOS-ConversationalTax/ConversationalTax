/// <reference types="jest" />
import { DatabaseDialogFlowService } from './database-dialogflow.service';
import { EmploymentContractService } from '../database/employmentContract/employmentContract.service';
import { DialogFlowService } from '../lang/dialog-flow/dialog-flow.service';
import { EmploymentContract } from '../database/employmentContract/interfaces/employmentContract.interface';

// Iterface SessionEntity
interface SessionEntity {
    value: string,
    synonyms: string[],
}

// Creates a mock of the classes and removes their implementation. Custom implementation is then added in beforeAll()
jest.mock('../lang/dialog-flow/dialog-flow.service', () => jest.fn(() => {}) );
jest.mock('../database/employmentContract/employmentContract.service', () => jest.fn(() => {}) );

describe('DatabaseDialogFlowService', () => {
    let databaseDialogFlowService: DatabaseDialogFlowService;
    let employmentContractService: any;
    let dialogFlowService: any;
    let employmentContracts: Array<EmploymentContract> = [  {_id: "ec1",
                                                             user_id: "u1",
                                                             name: "Testvertrag 1",
                                                             startDate_exact: new Date("1995-06-23"),
                                                             endDate_exact: new Date("2000-05-02"), },

                                                             {_id: "ec2",
                                                             user_id: "u2", },

                                                             {_id: "ec3",
                                                             user_id: "u3",
                                                             name: "Testvertrag 3",
                                                             startDate_string: "Next Month",
                                                             endDate_string: "Permanent", },

                                                             {_id: "ec4",
                                                             user_id: "u3",
                                                             name: "Testvertrag 4", }, ];

    beforeEach(() => {
        // Functions are mocked in beforeEach and not in beforeAll to reset the mock counters before each test
        dialogFlowService = {
            createSessionEntityType: jest.fn().mockImplementation(( name: string,
                                                                    sessionEntities: SessionEntity[],
                                                                    u_id: string) => true),
        };
        employmentContractService = {
            findEmploymentContractsOfUser: jest.fn().mockImplementation((user_id: string): Array<EmploymentContract> => {
                return employmentContracts.filter(i => i.user_id === user_id);
            }),
        };
        // Create a new DatabaseDialogFlowService
        databaseDialogFlowService = new DatabaseDialogFlowService(
            employmentContractService
        );
    });

    describe('updateEmploymentContractSessionEntity()', () => {
        it('should forward the contract entity of user 1 to the dialogFlowService', async () => {
            
            const reportedSuccess: boolean = 
                await databaseDialogFlowService.updateEmploymentContractSessionEntity("u1", dialogFlowService);

            // Expect reportedSuccess to be true
            expect(reportedSuccess).toBe(true);

            // Expect dialogFlowService.createSessionEntityType to be called one time
            expect(dialogFlowService.createSessionEntityType).toHaveBeenCalledTimes(1);

            // Expect the argument of the first call to dialogFlowService.createSessionEntityType to be correct
            // First argument (Name of the SessionEntity)
            expect(dialogFlowService.createSessionEntityType.mock.calls[0][0]).toBe("EmploymentContract");

            // Second argument (The session entity computed out of employmentContracts)
            const sessionEntity: Array<SessionEntity> = [{
                value: "ec1",
                synonyms: [
                    "ec1",
                    "Testvertrag 1",
                ],
            }, ];
            expect(dialogFlowService.createSessionEntityType.mock.calls[0][1]).toEqual(sessionEntity);

            // Third argument (The user id)
            expect(dialogFlowService.createSessionEntityType.mock.calls[0][2]).toBe("u1");

        });
        it('should forward the contract entity of user 2 to the dialogFlowService', async () => {
            
            const reportedSuccess: boolean = 
                await databaseDialogFlowService.updateEmploymentContractSessionEntity("u2", dialogFlowService);

            // Expect reportedSuccess to be true
            expect(reportedSuccess).toBe(true);

            // Expect dialogFlowService.createSessionEntityType to be called one time
            expect(dialogFlowService.createSessionEntityType).toHaveBeenCalledTimes(1);

            // Expect the argument of the first call to dialogFlowService.createSessionEntityType to be correct
            // First argument (Name of the SessionEntity)
            expect(dialogFlowService.createSessionEntityType.mock.calls[0][0]).toBe("EmploymentContract");

            // Second argument (The session entity computed out of employmentContracts)
            const sessionEntity: Array<SessionEntity> = [{
                value: "ec2",
                synonyms: [
                    "ec2",
                ],
            }, ];
            expect(dialogFlowService.createSessionEntityType.mock.calls[0][1]).toEqual(sessionEntity);

            // Third argument (The user id)
            expect(dialogFlowService.createSessionEntityType.mock.calls[0][2]).toBe("u2");
            
        });
        it('should forward the contract entity of user 3 to the dialogFlowService', async () => {
            
            const reportedSuccess: boolean = 
                await databaseDialogFlowService.updateEmploymentContractSessionEntity("u3", dialogFlowService);

            // Expect reportedSuccess to be true
            expect(reportedSuccess).toBe(true);

            // Expect dialogFlowService.createSessionEntityType to be called one time
            expect(dialogFlowService.createSessionEntityType).toHaveBeenCalledTimes(1);

            // Expect the argument of the first call to dialogFlowService.createSessionEntityType to be correct
            // First argument (Name of the SessionEntity)
            expect(dialogFlowService.createSessionEntityType.mock.calls[0][0]).toBe("EmploymentContract");

            // Second argument (The session entity computed out of employmentContracts)
            const sessionEntity: Array<SessionEntity> = [{
                value: "ec3",
                synonyms: [
                    "ec3",
                    "Testvertrag 3",
                ],
            },
            {
                value: "ec4",
                synonyms: [
                    "ec4",
                    "Testvertrag 4",
                ],
            }, ];
            expect(dialogFlowService.createSessionEntityType.mock.calls[0][1]).toEqual(sessionEntity);

            // Third argument (The user id)
            expect(dialogFlowService.createSessionEntityType.mock.calls[0][2]).toBe("u3");

        });
        it('should forward the contract entity of user 4 (has no contracts) to the dialogFlowService', async () => {
            
            const reportedSuccess: boolean = 
                await databaseDialogFlowService.updateEmploymentContractSessionEntity("u4", dialogFlowService);

            // Expect reportedSuccess to be true
            expect(reportedSuccess).toBe(true);

            // Expect dialogFlowService.createSessionEntityType to be called one time
            expect(dialogFlowService.createSessionEntityType).toHaveBeenCalledTimes(1);

            // Expect the argument of the first call to dialogFlowService.createSessionEntityType to be correct
            // First argument (Name of the SessionEntity)
            expect(dialogFlowService.createSessionEntityType.mock.calls[0][0]).toBe("EmploymentContract");

            // Second argument (The session entity computed out of employmentContracts)
            const sessionEntity: Array<SessionEntity> = [];
            expect(dialogFlowService.createSessionEntityType.mock.calls[0][1]).toEqual(sessionEntity);

            // Third argument (The user id)
            expect(dialogFlowService.createSessionEntityType.mock.calls[0][2]).toBe("u4");

        });
        it('should forward the contract entity of user 4 to the dialogFlowService and createSessionEntityType does fail', async () => {
            // Overwrite the createSessionEntityType function to fail this time
            dialogFlowService = {
                createSessionEntityType: jest.fn().mockImplementation(( name: string,
                                                                        sessionEntities: SessionEntity[],
                                                                        u_id: string) => false),
            };

            const reportedSuccess: boolean = 
                await databaseDialogFlowService.updateEmploymentContractSessionEntity("u4", dialogFlowService);

            // Expect reportedSuccess to be true
            expect(reportedSuccess).toBe(false);

            // Expect dialogFlowService.createSessionEntityType to be called one time
            expect(dialogFlowService.createSessionEntityType).toHaveBeenCalledTimes(1);

            // Expect the argument of the first call to dialogFlowService.createSessionEntityType to be correct
            // First argument (Name of the SessionEntity)
            expect(dialogFlowService.createSessionEntityType.mock.calls[0][0]).toBe("EmploymentContract");

            // Second argument (The session entity computed out of employmentContracts)
            const sessionEntity: Array<SessionEntity> = [];
            expect(dialogFlowService.createSessionEntityType.mock.calls[0][1]).toEqual(sessionEntity);

            // Third argument (The user id)
            expect(dialogFlowService.createSessionEntityType.mock.calls[0][2]).toBe("u4");

        });
    });
});