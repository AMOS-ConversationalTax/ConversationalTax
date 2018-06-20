import { IntentHandler } from './../handlers/handler.abstract';
import { AddStartDateIntentHandler } from '../handlers/handler.addstartdate';
import { IIntentFactory } from './factory.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddStartDateFactory implements IIntentFactory {

    constructor(private addStartDateIntentHandler: AddStartDateIntentHandler) {
    }

    createIntentHandler(): IntentHandler {
        return this.addStartDateIntentHandler;
    }

    appliesTo(action: string): boolean {
        return (action === IntentConfig.INTENT_PREFIX + '99d07e41-0833-4e50-991e-5f49ba4e9bc4');
    }
}