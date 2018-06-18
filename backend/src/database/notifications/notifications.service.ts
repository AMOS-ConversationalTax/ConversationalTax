import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './interfaces/notifications.interface';
import DBConfig from '../dbconfig';

/**
 * This class implements the connection to the notification table in the datastore
 * @class NotificationService
 */
@Injectable()
export class NotificationsDBService {

    /**
     * Constructor - is used for DI of the Model
     * @param conversationHistoryModel The model of the conversationHistory table (corresponds to db.conversationHistory in MongoDB)
     */
    constructor(@InjectModel(DBConfig.NOTIFICATIONS_MODEL_PROVIDER) private readonly notificationModel: Model<Notification>) { }

    /**
     * Create a new notification in the datastore - does not check if the notification already exists
     * @param {string} user_id - The id of the user the notification corresponds with
     * @param {string} title - The title of the notification
     * @param {string} description - The description of the notification
     * @returns {Promise<string>} - A promise containing the unique _id of the notification
     */
    async create(user_id: string, title: string, description: string): Promise<string> {

        // Get a new ObjectID
        const _id: string = mongoose.Types.ObjectId();

        // Create the notification
        const document: Model<Notification> = new this.notificationModel({ _id, user_id, title, description, read: false });
        await document.save();

        return _id;
    }

    /**
     * Find a specific notification by his unique id
     * @param {string} _id - The unique id of the notification
     * @returns {Promise<Array<Notification>>} - A promise containing the notification
     */
    async findNotification(_id: string): Promise<Array<Notification>> {

        return this.notificationModel.find({ '_id': _id }).exec();

    }

    /**
     * Find all notifications of a specific user
     * @param {string} user_id - The unique id of the user
     * @returns {Promise<Array<Notification>>} - A promise containing the notification(s)
     */
    async findNotificationByUser(user_id: string): Promise<Array<Notification>> {

        return this.notificationModel.find({ 'user_id': user_id }).exec();

    }

    /**
     * Get all notifications in the datastore
     * @returns {Promise<Array<Notification>>} - A promise containing all the notifications
     */
    async findAll(): Promise<Array<Notification>> {

        return this.notificationModel.find().exec();

    }

    /**
     * Delete a specific notification
     * @param {string} _id - The id of the notification
     * @returns {Promise<boolean>} - A promise containing a boolean success value
     */
    async deleteNotification(_id: string): Promise<boolean> {

        // Test whether notification with _id is existing
        const existingNotification: Array<Notification> = await this.notificationModel.find({ '_id': _id });

        if ( existingNotification.length === 1 ) {

            // Remove the notification
            await this.notificationModel.remove({ '_id': _id });

            return true;

        } else {

            // Notification does not exist
            return false;

        }
    }

    async markAsRead(user_id: string) {
        return this.notificationModel.updateMany({ user_id }, {read: true});
    }

}