import { IntentHandler } from './../handlers/handler.abstract';
import { CreateContractIntentHandler } from '../handlers/handler.createcontract';
import { IIntentFactory } from './factory.interface';
import { Injectable } from '@nestjs/common';
import  IntentConfig  from './../IntentConfig';

@Injectable()
export class CreateContractFactory implements IIntentFactory {

    constructor(private createContractIntentHandler: CreateContractIntentHandler) {
    }

    createIntentHandler(): IntentHandler {
        return this.createContractIntentHandler;
    }

    appliesTo(action: string): boolean {
        return (action === IntentConfig.INTENT_PREFIX + 'ae4cd4c7-67ea-41e3-b064-79b0a75505c5');
    }
}