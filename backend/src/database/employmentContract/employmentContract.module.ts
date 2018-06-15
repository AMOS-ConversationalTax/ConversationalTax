import { Module } from '@nestjs/common';
import { EmploymentContractService } from './employmentContract.service';
import { employmentContractProviders } from './employmentContract.providers';
import { DatabaseModule } from '../database.module';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { employmentContractSchema } from './schemas/employmentContract.schema';
import DBConfig from '../dbconfig';

@Module({
    imports: [DatabaseModule,
              MongooseModule.forFeature([{ name: DBConfig.EMPLOYMENTCONTRACT_MODEL_PROVIDER,
                                           schema: employmentContractSchema }])],
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