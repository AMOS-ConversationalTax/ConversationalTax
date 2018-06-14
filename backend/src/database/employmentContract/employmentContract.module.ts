import { Module } from '@nestjs/common';
import { EmploymentContractService } from './employmentContract.service';
import { employmentContractProviders } from './employmentContract.providers';
import { DatabaseModule } from '../database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        EmploymentContractService,
        ...employmentContractProviders,
    ],
    exports: [
        EmploymentContractService,
    ],
})
export class EmploymentContractModule { }