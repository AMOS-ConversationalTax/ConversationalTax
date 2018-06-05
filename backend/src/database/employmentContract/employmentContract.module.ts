import { Module } from '@nestjs/common';
import { EmploymentContractService } from './employmentContract.service';
import { employmentContractProviders } from './employmentContract.providers';
import { DatabaseModule } from '../database.module';
import {EmploymentContractController} from './employmentContract.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [EmploymentContractController],
    providers: [
        EmploymentContractService,
        ...employmentContractProviders,
    ],
})
export class EmploymentContractModule { }