import { Module } from '@nestjs/common';
import { EndDateIntentHandler } from './handler.enddate';
import { EmploymentContractModule } from './../../../database/employmentContract/employmentContract.module';
import { EndDateOpenIntentHandler } from './handler.enddateopen';
import { AddStartDateIntentHandler } from './handler.addstartdate';
import { HelpIntentHandler } from './handler.help';
import { ContextFactory } from '../factory/factory.context';
import { CreateContractFactory } from '../factory/factory.createcontract';
import { UserModule } from 'database/user/user.module';
import { ConnectorsModule } from 'connectors/connectors.module';
import { ExplanationService } from '../../explanation/explanation.service';
import { ContextIntentHandler } from './handler.context';
import { CreateContractIntentHandler } from './handler.createcontract';

@Module({
    imports: [EmploymentContractModule, UserModule, ConnectorsModule],
    providers: [EndDateIntentHandler, EndDateOpenIntentHandler, AddStartDateIntentHandler,
                HelpIntentHandler, ContextIntentHandler, CreateContractIntentHandler, ExplanationService],
    exports: [EndDateIntentHandler, EndDateOpenIntentHandler, AddStartDateIntentHandler,
                HelpIntentHandler, ContextIntentHandler, CreateContractIntentHandler, ExplanationService],
})
export class HandlerModule { }