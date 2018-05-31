import { Module } from '@nestjs/common';
import { UserModule } from 'database/user/user.module';
import { ReminderModule } from 'database/reminder/reminder.module';
import { EmploymentContractModule } from 'database/employmentContract/employmentContract.module';
import { LangController } from 'lang/lang.controller';
import { DialogFlowService } from 'lang/dialog-flow.service';
import { ConnectorsModule } from 'connectors/connectors.module'

@Module({
    imports: [UserModule, ReminderModule, EmploymentContractModule, ConnectorsModule],
    controllers: [LangController],
    providers: [DialogFlowService],
})
export class LangModule { }
