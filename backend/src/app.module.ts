import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { AppController } from './app.controller';
import { LangController } from './lang/lang.controller';
import { DialogFlowService } from './lang/dialog-flow.service';

@Module({
  imports: [PostsModule],
  controllers: [AppController, LangController],
  components: [DialogFlowService],
})
export class AppModule {}
