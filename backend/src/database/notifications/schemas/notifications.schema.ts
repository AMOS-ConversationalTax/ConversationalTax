import * as mongoose from 'mongoose';
import DBConfig from '../../dbconfig';

/**
 * The schema of the notifications table
 * @name NotificationsProviders
 * @type {mongoose.Schema}
 */
export const NotificationsSchema: mongoose.Schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    user_id: {
        ref: DBConfig.USER_MODEL_PROVIDER,
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        required: true,
    },
    navigateTo: {
        type: String,
        required: false,
    },
    textForDialogflow: {
        type: String,
        required: false,
    },
});