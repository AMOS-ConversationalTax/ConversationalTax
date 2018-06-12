import { Module } from '@nestjs/common';
import { ConnectorsModule } from './connectors/connectors.module';
import { EmploymentContractModule } from './database/employmentContract/employmentContract.module';
import { AppController } from './app.controller';
import { LangModule } from './lang/lang.module';
import { MongooseModule } from '@nestjs/mongoose';
import Config from '../config/config';

@Module({
  imports: [EmploymentContractModule, LangModule, ConnectorsModule, MongooseModule.forRoot(Config.MONGO_URL)],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
