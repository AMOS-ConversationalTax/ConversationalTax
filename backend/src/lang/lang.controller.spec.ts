/// <reference types="jest" />
import { LangController } from './lang.controller';
import { DialogFlowService } from './dialog-flow.service';
import { AudioIntentParams } from './lang.dto';

jest.mock('./dialog-flow.service'); // Mock the DialogFlowService class

describe('LangController', () => {
    let langController: LangController;
    let mockDialogFlowServiceInstance: any;

    beforeEach(() => {
        DialogFlowService.mockClear();
        langController = new LangController(new DialogFlowService());
        mockDialogFlowServiceInstance = DialogFlowService.mock.instances[0];
    });

    describe('POST /lang/text', () => {
        it('should forward the request to the dialogFlowService correctly', () => {
            const mockParams = { textInput: '' };
            langController.textIntent(mockParams);
            expect(mockDialogFlowServiceInstance.detectTextIntent).toHaveBeenCalledTimes(1);
            expect(mockDialogFlowServiceInstance.detectTextIntent).toHaveBeenCalledWith(mockParams.textInput);
        });
    });

    describe('POST /lang/audio', () => {
        it('should forward the request to the dialogFlowService', () => {
            const mockParams: AudioIntentParams = { platform: 'ios' };
            const mockFile = {buffer: new Buffer('')};
            langController.uploadFile(mockFile, mockParams);
            expect(mockDialogFlowServiceInstance.detectAudioIntent).toHaveBeenCalledTimes(1);
        });
    });
});