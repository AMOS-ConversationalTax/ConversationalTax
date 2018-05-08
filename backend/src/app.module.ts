import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule, MongooseModule.forRoot('mongodb://localhost:27017')],
  controllers: [AppController],
  components: [],
})
export class AppModule {}
