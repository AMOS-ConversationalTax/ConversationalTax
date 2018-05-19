import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './interfaces/users.interface';
import { UserSchema } from './schemas/users.schema';
import DBConfig from '../dbconfig';

export class UsersService {

    private userModel: Model<User> = mongoose.model(DBConfig.USER_MODEL_PROVIDER, UserSchema);

    async create(_id: string): Promise<User> {

        let document: Model<User> = new this.userModel({ "_id": _id });
        
        return await document.save();

    }

    async findAll(): Promise<User[]> {

        return await this.userModel.find().exec();

    }

}