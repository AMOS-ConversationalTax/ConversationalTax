import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
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
     * The model of the user table
     * Implements the connection to this table, too
     * Corresponds to db.user in MongoDB
     * @name UserService#userModel
     * @type {Model<User>}
     */
    private userModel: Model<User> = mongoose.model(DBConfig.USER_MODEL_PROVIDER, userSchema);

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