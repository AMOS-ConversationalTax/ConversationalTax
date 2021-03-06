import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmploymentContract } from './interfaces/employmentContract.interface';
import DBConfig from '../dbconfig';

/**
 * This class implements the connection to the employmentContract table in the datastore
 * @class EmploymentContractService
 */
@Injectable()
export class EmploymentContractService {

    /**
     * Constructor - is used for DI of the Model
     * @param {Model<EmploymentContract>} employmentContractModel The model of the employmentContract table
     */
    constructor(@InjectModel(DBConfig.EMPLOYMENTCONTRACT_MODEL_PROVIDER) private readonly employmentContractModel: Model<EmploymentContract>) {}

    /**
     * Create a new empty employmentContract in the datastore  - does not check if the employmentContract already exists
     * @param {string} user_id - The id of the user owning the employmentContract
     * @returns {Promise<string>} - A promise containing the _id of the employmentContract
     */
    async create(user_id: string): Promise<string> {

        // Get a new ObjectID
        const _id: string = mongoose.Types.ObjectId();

        // No user with this id exists => create a new one
        const document: Model<EmploymentContract> = new this.employmentContractModel({ '_id': _id, 'user_id': user_id });
        await document.save();

        return _id;

    }

    /**
     * Set or update the name of a specific employmentContract
     * @param {string} _id - The id of the employmentContract
     * @param {string} name - The (new) name of the employmentContract
     */
    async editName(_id: string, name: string) {

        // Test whether employmentContract with _id is existing
        const existingEmploymentContract: Array<EmploymentContract> = await this.employmentContractModel.find({ '_id': _id });
        if ( existingEmploymentContract.length === 1 ) {

            // Edit the employmentContract
            await this.employmentContractModel.update({ '_id': _id }, { $set: { 'name': name } });

        } else {

            throw new Error('EmploymentContract does not exists');

        }

    }

    /**
     * Set or update the startDate_exact of a specific employmentContract
     * @param {string} _id - The id of the employmentContract
     * @param {string} startDate_exact - The (new) exact startDate of the employmentContract
     */
    async editStartDateExact(_id: string, startDate_exact: Date) {

        // Test whether employmentContract with _id is existing
        const existingEmploymentContract: Array<EmploymentContract> = await this.employmentContractModel.find({ '_id': _id });

        if ( existingEmploymentContract.length === 1 ) {

            // Edit the employmentContract
            await this.employmentContractModel.update({ '_id': _id }, { $set: { 'startDate_exact': startDate_exact } });

        } else {

            throw new Error('EmploymentContract does not exists');

        }

    }

    /**
     * Remove startDate_exact of a specific employmentContract
     * @param {string} _id - The id of the employmentContract
     */
    async deleteStartDateExact(_id: string) {

        // Test whether employmentContract with _id is existing
        const existingEmploymentContract: Array<EmploymentContract> = await this.employmentContractModel.find({ '_id': _id });

        if ( existingEmploymentContract.length === 1 ) {

            // Edit the employmentContract
            await this.employmentContractModel.update({ '_id': _id }, { $unset: { 'startDate_exact': 1 } });

        } else {

            throw new Error('EmploymentContract does not exists');

        }

    }

    /**
     * Set or update the startDate_string of a specific employmentContract
     * @param {string} _id - The id of the employmentContract
     * @param {string} startDate_string - The (new) string startDate of the employmentContract
     */
    async editStartDateString(_id: string, startDate_string: string) {

        // Test whether employmentContract with _id is existing
        const existingEmploymentContract: Array<EmploymentContract> = await this.employmentContractModel.find({ '_id': _id });

        if ( existingEmploymentContract.length === 1 ) {

            // Edit the employmentContract
            await this.employmentContractModel.update({ '_id': _id }, { $set: { 'startDate_string': startDate_string } });

        } else {

            throw new Error('EmploymentContract does not exists');

        }

    }

    /**
     * Remove startDate_string of a specific employmentContract
     * @param {string} _id - The id of the employmentContract
     */
    async deleteStartDateString(_id: string) {

        // Test whether employmentContract with _id is existing
        const existingEmploymentContract: Array<EmploymentContract> = await this.employmentContractModel.find({ '_id': _id });

        if ( existingEmploymentContract.length === 1 ) {

            // Edit the employmentContract
            await this.employmentContractModel.update({ '_id': _id }, { $unset: { 'startDate_string': 1 } });

        } else {

            throw new Error('EmploymentContract does not exists');

        }

   }

    /**
     * Set or update the endDate_exact of a specific employmentContract
     * @param {string} _id - The id of the employmentContract
     * @param {string} endDate_exact - The (new) exact endDate of the employmentContract
     */
    async editEndDateExact(_id: string, endDate_exact: Date) {

        // Test whether employmentContract with _id is existing
        const existingEmploymentContract: Array<EmploymentContract> = await this.employmentContractModel.find({ '_id': _id });

        if ( existingEmploymentContract.length === 1 ) {

            // Edit the employmentContract
            await this.employmentContractModel.update({ '_id': _id }, { $set: { 'endDate_exact': endDate_exact } });

        } else {

            throw new Error('EmploymentContract does not exists');

        }

    }

    /**
     * Remove endDate_exact of a specific employmentContract
     * @param {string} _id - The id of the employmentContract
     */
    async deleteEndDateExact(_id: string) {

        // Test whether employmentContract with _id is existing
        const existingEmploymentContract: Array<EmploymentContract> = await this.employmentContractModel.find({ '_id': _id });

        if ( existingEmploymentContract.length === 1 ) {

            // Edit the employmentContract
            await this.employmentContractModel.update({ '_id': _id }, { $unset: { 'endDate_exact': 1 } });

        } else {

            throw new Error('EmploymentContract does not exists');

        }

    }

    /**
     * Set or update the endDate_string of a specific employmentContract
     * @param {string} _id - The id of the employmentContract
     * @param {string} endDate_string - The (new) string endDate of the employmentContract
     */
    async editEndDateString(_id: string, endDate_string: string) {

        // Test whether employmentContract with _id is existing
        const existingEmploymentContract: Array<EmploymentContract> = await this.employmentContractModel.find({ '_id': _id });

        if ( existingEmploymentContract.length === 1 ) {

            // Edit the employmentContract
            await this.employmentContractModel.update({ '_id': _id }, { $set: { 'endDate_string': endDate_string } });

        } else {

            throw new Error('EmploymentContract does not exists');

        }

    }

    /**
     * Remove endDate_string of a specific employmentContract
     * @param {string} _id - The id of the employmentContract
     */
    async deleteEndDateString(_id: string) {

        // Test whether employmentContract with _id is existing
        const existingEmploymentContract: Array<EmploymentContract> = await this.employmentContractModel.find({ '_id': _id });

        if ( existingEmploymentContract.length === 1 ) {

            // Edit the employmentContract
            await this.employmentContractModel.update({ '_id': _id }, { $unset: { 'endDate_string': 1 } });

        } else {

            throw new Error('EmploymentContract does not exists');

        }

   }

    /**
     * Find a specific employmentContract by his unique id
     * @param {string} _id - The unique id of the employmentContract
     * @returns {Promise<Array<EmploymentContract>>} - A promise containing the employmentContract
     */
    async findEmploymentContract(_id: string): Promise<Array<EmploymentContract>> {

        return await this.employmentContractModel.find({ '_id': _id }).exec();

    }

    /**
     * Find all employmentContracts of a specific user
     * @param {string} user_id - The unique id of the user
     * @returns {Promise<Array<EmploymentContract>>} - A promise containing the employmentContract(s)
     */
    async findEmploymentContractsOfUser(user_id: string): Promise<Array<EmploymentContract>> {

        return await this.employmentContractModel.find({ 'user_id': user_id }).exec();

    }

    /**
     * Find employmentContracts of a specific user by name of the employment contract
     * @param {string} user_id - The unique id of the user
     * @param {string} name - The name of the employment contract
     * @returns {Promise<Array<EmploymentContract>>} - A promise containing the employmentContract(s)
     */
    async findEmploymentContractsOfUserByName(user_id: string, name: string): Promise<Array<EmploymentContract>> {

        return await this.employmentContractModel.find({ 'user_id': user_id, 'name': name }).exec();

    }

    /**
     * Get all employmentContracts in the datastore
     * @returns {Promise<Array<EmploymentContract>>} - A promise containing all the employmentContracts
     */
    async findAll(): Promise<Array<EmploymentContract>> {

        return await this.employmentContractModel.find().exec();

    }

    /**
     * Delete a specific employmentContract
     * @param {string} _id - The id of the employmentContract
     */
    async deleteEmploymentContract(_id: string) {

        // Test whether employmentContract with _id is existing
        const existingEmploymentContract: Array<EmploymentContract> = await this.employmentContractModel.find({ '_id': _id });

        if ( existingEmploymentContract.length === 1 ) {

            // Edit the employmentContract
            await this.employmentContractModel.remove({ '_id': _id });

        } else {

            throw new Error('EmploymentContract does not exists');

        }

    }

}