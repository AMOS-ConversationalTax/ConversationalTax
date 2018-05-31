import { Module } from '@nestjs/common';
import { ConnectorsModule } from './connectors/connectors.module';
import { EmploymentContractModule } from './database/employmentContract/employmentContract.module';
import { AppController } from './app.controller';
import { LangModule } from './lang/lang.module';

@Module({
  imports: [EmploymentContractModule, LangModule, ConnectorsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
