import { Module } from '@nestjs/common';
import { EndDateFactory } from './factory.enddate';
import { AddStartDateFactory } from '../factory/factory.addstartdate';
import { ContextFactory } from '../factory/factory.context';
import { HelpFactory } from '../factory/factory.help';
import { CreateContractFactory } from '../factory/factory.createcontract';
import { EndDateOpenFactory } from '../factory/factory.enddateopen';
import { AbortFactory } from '../factory/factory.abort';
import { HandlerModule } from '../handlers/handler.module';

/**
 * Exports and bundles the IntentFactory
 */
@Module({
    imports: [HandlerModule],
    providers: [EndDateFactory, AddStartDateFactory, ContextFactory, HelpFactory, CreateContractFactory, EndDateOpenFactory, AbortFactory],
    exports: [EndDateFactory, AddStartDateFactory, ContextFactory, HelpFactory, CreateContractFactory, EndDateOpenFactory, AbortFactory],
})
export class FactoryModule { }