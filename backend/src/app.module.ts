import { Module } from '@nestjs/common';
import { UserModule } from './database/user/user.module';
import { ReminderModule } from './database/reminder/reminder.module';
import { EmploymentContractModule } from './database/employmentContract/employmentContract.module';
import { AppController } from './app.controller';
import { LangController } from './lang/lang.controller';
import { DialogFlowService } from './lang/dialog-flow.service';
import { EmployeeService } from 'lang/employee.service';
import { EmploymentContractService } from 'database/employmentContract/employmentContract.service';

@Module({
  imports: [UserModule, ReminderModule, EmploymentContractModule],
  controllers: [AppController, LangController],
  providers: [DialogFlowService, EmployeeService, EmploymentContractService],
})
export class AppModule {}
