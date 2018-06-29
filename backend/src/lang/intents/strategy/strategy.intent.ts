import { IIntentFactory } from '../factory/factory.interface';
import { IntentHandler } from '../handlers/handler.abstract';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EndDateFactory } from '../factory/factory.enddate';
import { AddStartDateFactory } from '../factory/factory.addstartdate';
import { ContextFactory } from '../factory/factory.context';
import { HelpFactory } from '../factory/factory.help';
import { CreateContractFactory } from '../factory/factory.createcontract';
import { EndDateOpenFactory } from '../factory/factory.enddateopen';
import { AbortFactory } from '../factory/factory.abort';
import { WhatToDoFactory } from '../factory/factory.whatToDo';

/**
 * Class to get the right handler for an intent
 */
@Injectable()
export class IntentStrategy {
    private readonly intentFactories: IIntentFactory[];

    constructor(endDateFactory: EndDateFactory,
                addStartDateFactory: AddStartDateFactory,
                contextFactory: ContextFactory,
                helpFactory: HelpFactory,
                createContactFactory: CreateContractFactory,
                endDateOpenFactory: EndDateOpenFactory,
                abortFactory: AbortFactory,
                whatToDoFactory: WhatToDoFactory) {
        this.intentFactories = [endDateFactory, addStartDateFactory, contextFactory, helpFactory,
            createContactFactory, abortFactory, endDateOpenFactory, whatToDoFactory];
    }

    /**
     * Gets the first IntentHandler that matches the intent
     * @param {string} intentID The intent's ID
     * @returns {IntentHandler} The appropriate handler
     */
    public createIntentHandler(intentID: string): IntentHandler{
        const intentFactory = this.intentFactories.filter((factory) => factory.appliesTo(intentID));

        if (intentFactory.length === 0) {
            // tslint:disable-next-line:no-console
            console.error(`For this Intent (${intentID}) no handler has been defined.`);
            throw new InternalServerErrorException('For this Intent no handler has been defined.');
        } else if (intentFactory.length > 1) {
            // tslint:disable-next-line:no-console
            console.error('More than one IntentHandler is defined for this intent');
            throw new InternalServerErrorException('More than one IntentHandler is defined for this intent');
        }

        return intentFactory[0].createIntentHandler();
    }
}