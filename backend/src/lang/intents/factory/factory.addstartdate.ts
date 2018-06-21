import { IntentHandler } from './../handlers/handler.abstract';
import { AddStartDateIntentHandler } from '../handlers/handler.addstartdate';
import { IIntentFactory } from './factory.interface';
import { Injectable } from '@nestjs/common';
import IntentConfig from './../IntentConfig';

@Injectable()
export class AddStartDateFactory implements IIntentFactory {

    constructor(private addStartDateIntentHandler: AddStartDateIntentHandler) {
    }

    /**
     * Gets the IntentHandler
     * @returns {IntentHandler} The IntentHandler instance
     */
    createIntentHandler(): IntentHandler {
        return this.addStartDateIntentHandler;
    }

    /**
     * Whether this IntentFactory applies to the intent
     * @param intentID The intent's ID
     * @returns {boolean}
     */
    appliesTo(intentID: string): boolean {
        return (intentID === IntentConfig.INTENT_PREFIX + '99d07e41-0833-4e50-991e-5f49ba4e9bc4');
    }
}