import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { userSchema } from './schemas/user.schema';
import DBConfig from '../dbconfig';

/**
 * This class implements the connection to the users table in the datastore
 * @class UserService
 */
@Injectable()
export class UserService {

    /**
     * Constructor - is used for DI of the Model
     * @param userModel The model of the user table (corresponds to db.user in MongoDB)
     */
    constructor(@InjectModel(DBConfig.USER_MODEL_PROVIDER) private readonly userModel: Model<User>) {}

    /**
     * Create a new user in the datastore - checks if the user already exists
     * @param {string} _id - The unique id of the user
     * @returns {Promise<boolean>} - A promise containing true for a new user being created
     */
    async create(_id: string): Promise<boolean> {

        // Test whether user with _id is already existing
        const existingUsers: Array<User> = await this.userModel.find({ '_id': _id });

        if ( existingUsers.length === 0 ) {

            // No user with this id exists => create a new one
            const document: Model<User> = new this.userModel({ '_id': _id });
            await document.save();

            return true;

        } else {

            // User already exists => do not create a new one
            return false;

        }

    }

    /**
     * Check whether the given user already exists.
     * @param _id The unique id of the user
     * @returns {Promise<boolean>} - A promise whether the user exists
     */
    public async exists(_id: string): Promise<boolean> {
        const existingUsers: Array<User> = await this.userModel.find({ '_id': _id });
        return existingUsers.length === 0;
    }

    /**
     * Find a specific user by his unique id
     * @param {string} _id - The unique id of the user
     * @returns {Promise<Array<User>>} - A promise containing the user
     */
    async findUser(_id: string): Promise<Array<User>> {

        return await this.userModel.find({ '_id': _id }).exec();

    }

    /**
     * Get all users in the datastore
     * @returns {Promise<Array<User>>} - A promise containing all the users
     */
    async findAll(): Promise<Array<User>> {

        return await this.userModel.find().exec();

    }

}