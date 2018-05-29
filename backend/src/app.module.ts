import { Module } from '@nestjs/common';
import { EmploymentContractModule } from './database/employmentContract/employmentContract.module';
import { AppController } from './app.controller';
import { LangModule } from 'lang/lang.module';

@Module({
  imports: [EmploymentContractModule, LangModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
