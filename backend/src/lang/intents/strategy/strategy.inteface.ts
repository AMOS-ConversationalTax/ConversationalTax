import { IntentHandler } from './../handlers/handler.abstract';

export interface IIntentStrategy {
    createIntentHandler(action: string): IntentHandler;
}