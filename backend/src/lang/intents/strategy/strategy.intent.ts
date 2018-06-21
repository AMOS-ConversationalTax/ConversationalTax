import { IIntentStrategy } from './strategy.inteface';
import { IIntentFactory } from '../factory/factory.interface';
import { IntentHandler } from '../handlers/handler.abstract';
import { Injectable } from '@nestjs/common';
import { EndDateFactory } from '../factory/factory.enddate';
import { AddStartDateFactory } from '../factory/factory.addstartdate';
import { ContextFactory } from '../factory/factory.context';
import { HelpFactory } from '../factory/factory.help';
import { CreateContractFactory } from '../factory/factory.createcontract';
import { EndDateOpenFactory } from '../factory/factory.enddateopen';

@Injectable()
export class IntentStrategy implements IIntentStrategy {
    private readonly intentFactories: Array<IIntentFactory>;

    constructor(private endDateFactory: EndDateFactory,
                private addStartDateFactory: AddStartDateFactory,
                private contextFactory: ContextFactory,
                private helpFactory: HelpFactory,
                private createContactFactory: CreateContractFactory,
                private endDateOpenFactory: EndDateOpenFactory) {
        this.intentFactories = [endDateFactory, addStartDateFactory, contextFactory, helpFactory, createContactFactory, endDateOpenFactory];
    }

    public createIntentHandler(action: string): IntentHandler{
        const intentFactory = this.intentFactories.find((factory) => factory.appliesTo(action));

        if (intentFactory === null) {
            // TODO
        }

        return intentFactory.createIntentHandler();
    }
}