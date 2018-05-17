import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [PostsModule],
})
export class AppModule {}
