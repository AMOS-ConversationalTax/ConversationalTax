import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { Post } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import Config from '../../../config/config';

@Injectable()
export class PostsService {
    constructor(
        @Inject(Config.POST_MODEL_PROVIDER) private readonly postModel: Model<Post>) { }

    async create(createPostDto: CreatePostDto): Promise<Post> {
        const createdPost = new this.postModel(createPostDto);
        return await createdPost.save();
    }

    async findAll(): Promise<Post[]> {
        return await this.postModel.find().exec();
    }
}