import { Document } from 'mongoose';

/**
 * This implements the Reminder interface used by ReminderService
 * @interface Reminder
 */
export interface Reminder extends Document {

    /**
     * The unique id of the Reminder
     * @name Reminder#_id
     * @type {string}
     */
    readonly _id: string;

    /**
     * The id of user that should be reminded
     * @name Reminder#user_id
     * @type {string}
     */
    readonly user_id: string;

    /**
     * The description of the reminder
     * @name Reminder#description
     * @type {string}
     */
    readonly description: string;

    /**
     * The date the user should be reminded
     * @name Reminder#date
     * @type {Date}
     */
    readonly date: Date;

}