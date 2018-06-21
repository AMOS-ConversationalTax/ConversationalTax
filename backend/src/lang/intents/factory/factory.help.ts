import { IntentHandler } from './../handlers/handler.abstract';
import { HelpIntentHandler } from '../handlers/handler.help';
import { IIntentFactory } from './factory.interface';
import { Injectable } from '@nestjs/common';
import  IntentConfig  from './../IntentConfig';

@Injectable()
export class HelpFactory implements IIntentFactory {

    constructor(private helpIntentHandler: HelpIntentHandler) {
    }

    createIntentHandler(): IntentHandler {
        return this.helpIntentHandler;
    }

    appliesTo(action: string): boolean {
        return (action === IntentConfig.INTENT_PREFIX + 'e695c10c-0a85-4ede-a899-67f264ff5275');
    }
}