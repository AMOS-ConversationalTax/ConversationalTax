import { IntentHandler } from './../handlers/handler.abstract';
import { EndDateIntentHandler } from '../handlers/handler.enddate';
import { IIntentFactory } from './factory.interface';
import { Injectable } from '@nestjs/common';
import  IntentConfig  from './../IntentConfig';


@Injectable()
export class EndDateFactory implements IIntentFactory {

    constructor(private endDateIntentHandler: EndDateIntentHandler) {
    }

    createIntentHandler(): IntentHandler {
        return this.endDateIntentHandler;
    }

    appliesTo(action: string): boolean {
        return (action === IntentConfig.INTENT_PREFIX + '9694cec4-f8e8-478b-b9cc-fa1879b7a202');
    }
}