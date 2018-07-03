import { Module } from '@nestjs/common';
import { EndDateIntentHandler } from './handler.enddate';
import { EmploymentContractModule } from './../../../database/employmentContract/employmentContract.module';
import { EndDateOpenIntentHandler } from './handler.enddateopen';
import { AddStartDateIntentHandler } from './handler.addstartdate';
import { AbortIntentHandler } from './handler.abort';
import { HelpIntentHandler } from './handler.help';
import { UserModule } from 'database/user/user.module';
import { ConnectorsModule } from 'connectors/connectors.module';
import { ExplanationService } from '../../explanation/explanation.service';
import { ContextIntentHandler } from './handler.context';
import { CreateContractIntentHandler } from './handler.createcontract';
import { ParameterMappingsModule } from '../parametermappings/parametermappings.module';
import { WhatToDoIntentHandler } from './handler.whatToDo';
import { RenameIntentHandler } from './handler.rename';
import { DeleteContractFactory } from '../factory/factory.deletecontract';
import { DeleteContractIntentHandler } from './handler.deletecontract';

const modules = [
    EndDateIntentHandler,
    EndDateOpenIntentHandler,
    AddStartDateIntentHandler,
    HelpIntentHandler,
    ContextIntentHandler,
    CreateContractIntentHandler,
    ExplanationService,
    AbortIntentHandler,
    WhatToDoIntentHandler,
    RenameIntentHandler,
    DeleteContractIntentHandler,
];

/**
 * Exports and bundles the IntentHandlers
 */
@Module({
    imports: [EmploymentContractModule, UserModule, ConnectorsModule, ParameterMappingsModule],
    providers: modules,
    exports: modules,
})
export class HandlerModule { }