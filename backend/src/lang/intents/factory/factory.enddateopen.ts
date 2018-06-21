import { IntentHandler } from './../handlers/handler.abstract';
import { EndDateOpenIntentHandler } from '../handlers/handler.enddateopen';
import { IIntentFactory } from './factory.interface';
import { Injectable } from '@nestjs/common';
import  IntentConfig  from './../IntentConfig';


@Injectable()
export class EndDateOpenFactory implements IIntentFactory {

    constructor(private endDateOpenIntentHandler: EndDateOpenIntentHandler) {
    }

    createIntentHandler(): IntentHandler {
        return this.endDateOpenIntentHandler;
    }

    appliesTo(action: string): boolean {
        return (action === IntentConfig.INTENT_PREFIX + 'd1523cf3-bb4d-47cb-8fc4-bec3d669628e');
    }
}