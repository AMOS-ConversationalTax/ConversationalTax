import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { catsProviders } from './cats.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [forwardRef( () => DatabaseModule)],
  controllers: [CatsController],
  components: [CatsService, ...catsProviders],
})
export class CatsModule {}
