/// <reference types="jest" />
import { ExplanationService } from './explanation.service';
import { DialogFlowStructure } from '../dialog-flow/dialogflow-structure';

describe('ExplanationService', () => {
    const explanationService = new ExplanationService();

    describe('getContextExplanation()', () => {
        it('should get right context explanation', () => {
            const intentInfo = DialogFlowStructure[0];
            const intent = {displayName: intentInfo.displayName, name: intentInfo.name};
            const contextExplanation = explanationService.getContextExplanation(intent);
            expect(contextExplanation).toBe(intentInfo.contextText);
        });

        it('should return fallback text if intent is unknown', () => {
            const intent = { displayName: 'asdfsdafsdfsdf', name: 'asdfsdafsdfsdf' };
            const contextExplanation = explanationService.getContextExplanation(intent);
            expect(contextExplanation).toBeDefined();
        });
    });

    describe('getHelpText()', () => {
        it('should get the intent helptext if action is unset or not found', () => {
            const intentInfo = DialogFlowStructure[0];
            const intent = {displayName: intentInfo.displayName, name: intentInfo.name};
            let contextExplanation = explanationService.getHelpText(intent);
            expect(contextExplanation).toBe(intentInfo.helpText);
            contextExplanation = explanationService.getHelpText(intent, 'sadasd');
            expect(contextExplanation).toBe(intentInfo.helpText);
        });

        it('should return action helptext if action is set', () => {
            const intentInfo = DialogFlowStructure[0];
            const actionInfo = intentInfo.actions[0];
            const intent = { displayName: intentInfo.displayName, name: intentInfo.name };
            const contextExplanation = explanationService.getHelpText(intent, actionInfo.name);
            expect(contextExplanation).toBe(actionInfo.helpText);
        });
    });

});