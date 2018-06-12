import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Reminder } from './interfaces/reminder.interface';
import { reminderSchema } from './schemas/reminder.schema';
import DBConfig from '../dbconfig';

/**
 * This class implements the connection to the reminder table in the datastore
 * @class ReminderService
 */
@Injectable()
export class ReminderService {

    /**
     * Constructor - is used for DI of the Model
     * @param reminderModel The model of the reminder table (corresponds to db.reminder in MongoDB)
     */
    constructor(@InjectModel(DBConfig.REMINDER_MODEL_PROVIDER) private readonly reminderModel: Model<Reminder>) {}

    /**
     * Create a new reminder in the datastore - does not check if the reminder already exists
     * @param {string} user_id - The id of the user the reminder corresponds with
     * @param {string} description - The description of the reminder
     * @param {Date} date - The date the user should be reminded
     * @returns {Promise<string>} - A promise containing the unique _id of the reminder
     */
    async create(user_id: string, description: string, date: Date): Promise<string> {

        // Get a new ObjectID
        const _id: string = mongoose.Types.ObjectId();

        // Create the reminder
        const document: Model<Reminder> = new this.reminderModel({ '_id': _id, 'user_id': user_id, 'description': description, 'date': date });
        await document.save();

        return _id;

    }

    /**
     * Find a specific reminder by his unique id
     * @param {string} _id - The unique id of the reminder
     * @returns {Promise<Array<Reminder>>} - A promise containing the reminder
     */
    async findReminder(_id: string): Promise<Array<Reminder>> {

        return await this.reminderModel.find({ '_id': _id }).exec();

    }

    /**
     * Find all reminders of a specific user
     * @param {string} user_id - The unique id of the user
     * @returns {Promise<Array<Reminder>>} - A promise containing the reminder(s)
     */
    async findReminderByUser(user_id: string): Promise<Array<Reminder>> {

        return await this.reminderModel.find({ 'user_id': user_id }).exec();

    }

    /**
     * Find all reminders at a specific date
     * @param {Date} date - The requested date
     * @returns {Promise<Array<Reminder>>} - A promise containing the reminder(s)
     */
    async findReminderByDate(date: Date): Promise<Array<Reminder>> {

        return await this.reminderModel.find({ 'date': date }).exec();

    }

    /**
     * Find all reminders of a specific user at a specific date
     * @param {string} user_id - The unique id of the user
     * @param {Date} date - The requested date
     * @returns {Promise<Array<Reminder>>} - A promise containing the reminder(s)
     */
    async findReminderByUserAndDate(user_id: string, date: Date): Promise<Array<Reminder>> {

        return await this.reminderModel.find({ 'user_id': user_id, 'date': date }).exec();

    }

    /**
     * Get all reminders in the datastore
     * @returns {Promise<Array<Reminder>>} - A promise containing all the reminders
     */
    async findAll(): Promise<Array<Reminder>> {

        return await this.reminderModel.find().exec();

    }

    /**
     * Delete a specific reminder
     * @param {string} _id - The id of the reminder
     * @returns {Promise<boolean>} - A promise containing a boolean success value
     */
    async deleteReminder(_id: string): Promise<boolean> {

        // Test whether reminder with _id is existing
        const existingReminder: Array<Reminder> = await this.reminderModel.find({ '_id': _id });

        if ( existingReminder.length === 1 ) {

            // Remove the reminder
            await this.reminderModel.remove({ '_id': _id });

            return true;

        } else {

            // Reminder does not exist
            return false;

        }

    }

}