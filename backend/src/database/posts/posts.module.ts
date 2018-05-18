import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { postsProviders } from './posts.providers';
import { DatabaseModule } from '../database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [
        PostsService,
        ...postsProviders,
    ],
})
export class PostsModule { }