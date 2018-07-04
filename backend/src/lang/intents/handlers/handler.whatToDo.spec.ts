/// <reference types="jest" />
import {WhatToDoIntentHandler} from './handler.whatToDo';

jest.mock('../../../database/employmentContract/employmentContract.service', () => jest.fn(() => { }));

const FAU_ALL_SET = { name: 'FAU', startDate_exact: '', endDate_exact: '' };
const FAU_MISSING_STARTDATE = { name: 'FAU', endDate_exact: '' };
const FAU_MISSING_ENDDATE = { name: 'FAU', startDate_exact: '' };

describe('WhatToDoIntentHandler', () => {
    let whatToDoIntentHandler: WhatToDoIntentHandler;
    let contractService: any;

    beforeEach(() => {
        contractService = {
            findEmploymentContractsOfUser: jest.fn().mockImplementation(() => []),
        };
        whatToDoIntentHandler = new WhatToDoIntentHandler(contractService);
    });

    it('should return noContractText if user has no contracts', async () => {
        const { text } = await whatToDoIntentHandler.handle({});
        expect(text).toBe(whatToDoIntentHandler.noContractText);
    });

    it('should return allFullfilt if user has set all fields for all contracts', async () => {
        contractService.findEmploymentContractsOfUser.mockImplementationOnce(() => [FAU_ALL_SET]);
        const { text } = await whatToDoIntentHandler.handle({});
        expect(text).toBe(whatToDoIntentHandler.allFullfilt);
    });

    // One instance missing

    it('should return correct sentence if one startDate is unset', async () => {
        contractService.findEmploymentContractsOfUser.mockImplementationOnce(() => [FAU_MISSING_STARTDATE]);
        const { text } = await whatToDoIntentHandler.handle({});
        expect(text).toBe('Du könntest für deinen Arbeitsvertrag FAU noch das Startdatum angeben.');
    });

    it('should return correct sentence if three startDates are unset', async () => {
        contractService.findEmploymentContractsOfUser.mockImplementationOnce(() => [FAU_MISSING_STARTDATE, FAU_MISSING_STARTDATE, FAU_MISSING_STARTDATE]);
        const { text } = await whatToDoIntentHandler.handle({});
        expect(text).toBe('Du könntest für deine Arbeitsverträge FAU, FAU und FAU noch das Startdatum angeben.');
    });

    // Mutliple instances of one type missing

    it('should return correct sentence if one endDate is unset', async () => {
        contractService.findEmploymentContractsOfUser.mockImplementationOnce(() => [FAU_MISSING_ENDDATE]);
        const { text } = await whatToDoIntentHandler.handle({});
        expect(text).toBe('Du könntest für deinen Arbeitsvertrag FAU noch das Enddatum angeben.');
    });

    it('should return correct sentence if three endDates are unset', async () => {
        contractService.findEmploymentContractsOfUser.mockImplementationOnce(() => [FAU_MISSING_ENDDATE, FAU_MISSING_ENDDATE, FAU_MISSING_ENDDATE]);
        const { text } = await whatToDoIntentHandler.handle({});
        expect(text).toBe('Du könntest für deine Arbeitsverträge FAU, FAU und FAU noch das Enddatum angeben.');
    });

    // Mixed instances of missing types

    it('should return correct sentence if one startDate and two endDates are unset', async () => {
        contractService.findEmploymentContractsOfUser.mockImplementationOnce(() => [FAU_MISSING_STARTDATE, FAU_MISSING_ENDDATE, FAU_MISSING_ENDDATE]);
        const { text } = await whatToDoIntentHandler.handle({});
        expect(text).toBe('Du könntest für deinen Arbeitsvertrag FAU noch das Startdatum oder für deine Arbeitsverträge FAU und FAU das Enddatum angeben.');
    });

    it('should return correct sentence if two startDate and two endDates are unset', async () => {
        contractService.findEmploymentContractsOfUser.mockImplementationOnce(() => [FAU_MISSING_STARTDATE, FAU_MISSING_STARTDATE, FAU_MISSING_ENDDATE, FAU_MISSING_ENDDATE]);
        const { text } = await whatToDoIntentHandler.handle({});
        expect(text).toBe('Du könntest für deine Arbeitsverträge FAU und FAU noch das Startdatum angeben.');
    });

});