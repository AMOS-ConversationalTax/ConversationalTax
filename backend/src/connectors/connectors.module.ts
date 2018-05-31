import { Module } from '@nestjs/common';
import { DatabaseDialogFlowService } from './database-dialogflow.service';
import { EmploymentContractModule } from '../database/employmentContract/employmentContract.module';

@Module({
    imports: [EmploymentContractModule],
    providers: [DatabaseDialogFlowService],
    exports: [DatabaseDialogFlowService],
})
export class ConnectorsModule { }