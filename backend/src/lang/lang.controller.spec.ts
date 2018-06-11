/// <reference types="jest" />
import { LangController } from './lang.controller';
import { DialogFlowService } from './dialog-flow/dialog-flow.service';
import { DatabaseDialogFlowService } from '../connectors/database-dialogflow.service';
import { AudioIntentParams, TextIntentBody, TextIntentParams } from './lang.dto';
import { UserService } from '../database/user/user.service';
import { EmploymentContractService } from '../database/employmentContract/employmentContract.service';
import { ConversationHistoryService } from '../database/conversationHistory/conversationHistory.service';
import { ExplanationService } from './explanation/explanation.service';
import { DatabaseLangService } from '../connectors/database-lang.service';

// Creates a mock of the classes and removes their implementation. Custom implementation is then added in beforeAll()
jest.mock('./dialog-flow/dialog-flow.service', () => jest.fn(() => {}) );
jest.mock('../database/user/user.service', () => jest.fn(() => { }));
jest.mock('../database/employmentContract/employmentContract.service', () => jest.fn(() => { }));
jest.mock('./explanation/explanation.service', () => jest.fn(() => { }));
jest.mock('../connectors/database-lang.service', () => jest.fn(() => { }));

describe('LangController', () => {
    let langController: LangController;
    let dialogFlowService: any;
    let userService: any;
    let employmentContractService: any;
    let explanationService: any;
    let databaseLangService: any;

    beforeAll(() => {
        dialogFlowService = {
            detectTextIntent: jest.fn().mockImplementation(() => [{}]),
            detectAudioIntent: jest.fn().mockImplementation(() => [{}]),
            extractResponseText: jest.fn().mockImplementation(() => ''),
            extractResponseIntent: jest.fn().mockImplementation(() => ({name: ''})),
            extractResponseAction: jest.fn().mockImplementation(() => ''),
        };
        userService = {
            exists: jest.fn().mockImplementation(() => true),
        };
        employmentContractService = {
            create: jest.fn(),
        };
        explanationService = {
        };
        databaseLangService = {
            createConversationHistoryEntry: jest.fn(),
        };
    });

    beforeEach(() => {
        langController = new LangController(
            dialogFlowService,
            userService,
            employmentContractService,
            explanationService,
            databaseLangService,
        );
    });

    describe('POST /lang/text', () => {
        it('should forward the request to the dialogFlowService correctly', async () => {
            const mockBody: TextIntentBody = { textInput: ''};
            const mockParams: TextIntentParams = { u_id: 'This434234_is4234_a2234_U43_ID44' };
            await langController.textIntent(mockBody, mockParams);
            expect(dialogFlowService.detectTextIntent).toHaveBeenCalledTimes(1);
            expect(dialogFlowService.detectTextIntent).toHaveBeenCalledWith(mockBody.textInput, mockParams.u_id);
        });
    });

    describe('POST /lang/audio', () => {
        it('should forward the request to the dialogFlowService', async () => {
            const mockParams: AudioIntentParams = { platform: 'ios', u_id: 'This434234_is4234_a2234_U43_ID44' };
            const mockFile = {buffer: new Buffer('')};
            dialogFlowService.detectAudioIntent.mockImplementationOnce((file, params) => {
                return [{}];
            });
            await langController.uploadFile(mockFile, mockParams);
            expect(dialogFlowService.detectAudioIntent).toHaveBeenCalledTimes(1);
        });

        it('should create a database entry for the new contract', async () => {
            const mockParams: AudioIntentParams = { platform: 'ios', u_id: 'This434234_is4234_a2234_U43_ID44' };
            const mockFile = { buffer: new Buffer('') };
            dialogFlowService.extractResponseIntent.mockImplementationOnce(
                () => ({ name: 'projects/test-c7ec0/agent/intents/ae4cd4c7-67ea-41e3-b064-79b0a75505c5' })
            );
            await langController.uploadFile(mockFile, mockParams);
            expect(employmentContractService.create).toHaveBeenCalledTimes(1);
        });
    });
});