import { Module } from '@nestjs/common';
import { UserModule } from '../database/user/user.module';
import { ReminderModule } from '../database/reminder/reminder.module';
import { EmploymentContractModule } from '../database/employmentContract/employmentContract.module';
import { LangController } from '../lang/lang.controller';
import { DialogFlowService } from '../lang/dialog-flow.service';
import { ConnectorsModule } from '../connectors/connectors.module';
import { ExplanationService } from './explanation.service';

@Module({
    imports: [UserModule, ReminderModule, EmploymentContractModule, ConnectorsModule],
    controllers: [LangController],
    providers: [DialogFlowService, ExplanationService],
})
export class LangModule { }
