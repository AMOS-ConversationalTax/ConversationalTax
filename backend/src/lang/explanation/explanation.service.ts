import { Injectable } from '@nestjs/common';
import { DialogFlowStructure, IntentInformation, ActionInformation } from '../dialog-flow/dialogflow-structure';

const FALLBACK_HELPTEXT = 'Zur letzten Antwort kann ich dir leider keine Erklärung anbieten.';
const FALLBACK_CONTEXT_EXPLANATION = 'Wir haben gerade über kein spezifisches Thema geredet.';

/**
 * Provides helptexts and information about the current context.
 */
@Injectable()
export class ExplanationService {
    /**
     * Gets a context explanation for the user.
     * @param {Intent} intent The Intent of which you want to get the context explanation
     * @returns {string} A specific context explanation for the user.
     */
    public getContextExplanation(previousIntent: Intent): string {
        const intentInfo = this.getIntentInformation(previousIntent);
        if (intentInfo === undefined) {
            return FALLBACK_HELPTEXT;
        }
        return intentInfo.contextText;
    }

    /**
     * Gets a helptext for the user.
     * @param {Intent} intent The Intent of which you want to get the helptext
     * @param {string} actionName The action name of which you want to get the helptext
     * @returns {string} A specific helptext for the user.
     */
    public getHelpText(intent: Intent, actionName?: string): string {
        const intentInfo = this.getIntentInformation(intent);

        if (actionName !== undefined) {
            const actionInfo = this.getActionInformation(intent, actionName);
            if (actionInfo !== undefined) {
                return actionInfo.helpText;
            }
        }

        if (intentInfo !== undefined) {
            return intentInfo.helpText;
        }

        return FALLBACK_HELPTEXT;
    }

    /**
     * Gets information about a specific intent
     * @param {Intent} intent The intent, in which the action is used.
     * @returns {IntentInformation | undefined} The found information about the intent or undefined
     */
    private getIntentInformation(intent: Intent): IntentInformation | undefined {
        return DialogFlowStructure.find((currIntent) => {
            return intent.name === currIntent.name || intent.displayName === currIntent.displayName;
        });
    }

    /**
     * Gets information about a specific action
     * @param {Intent} intent The intent, in which the action is used.
     * @param {string} actionName The name of the action
     * @returns {ActionInformation | undefined} The found information about the action or undefined
     */
    private getActionInformation(intent: Intent, actionName: string): ActionInformation | undefined {
        const intentInfo = this.getIntentInformation(intent);
        if (intentInfo === undefined) {
            return undefined;
        }

        return intentInfo.actions.find((currAction) => {
            return currAction.name === actionName;
        });
    }
}
