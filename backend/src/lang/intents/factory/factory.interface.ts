import { IntentHandler } from './../handlers/handler.abstract';

export interface IIntentFactory {
    createIntentHandler(): IntentHandler;
    appliesTo(action: string): boolean;
}
