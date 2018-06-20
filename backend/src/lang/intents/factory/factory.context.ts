import { IntentHandler } from './../handlers/handler.abstract';
import { ContextIntentHandler } from '../handlers/handler.context';
import { IIntentFactory } from './factory.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ContextFactory implements IIntentFactory {

    constructor(private contextIntentHandler: ContextIntentHandler) {
    }

    createIntentHandler(): IntentHandler {
        return this.contextIntentHandler;
    }

    appliesTo(action: string): boolean {
        return (action === IntentConfig.INTENT_PREFIX + '39611549-cad9-4152-9130-22ed7879e700');
    }
}