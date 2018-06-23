import { Document } from 'mongoose';

/**
 * This implements the EmploymentContract interface used by UserService
 * @interface EmploymentContract
 */
export interface EmploymentContract extends Document {

    /**
     * The id of the EmploymentContract
     * @name EmploymentContract#_id
     * @type {string}
     */
    readonly _id: string;

    /**
     * The id of user owning the EmploymentContract
     * @name EmploymentContract#user_id
     * @type {string}
     */
    readonly user_id: string;

    /**
     * The name of the EmploymentContract
     * @name EmploymentContract#name
     * @type {string}
     */
    readonly name?: string;

    /**
     * The start date of the EmploymentContract if an exact date is known
     * @name EmploymentContract#startDate_exact
     * @type {Date}
     */
    readonly startDate_exact?: Date;

    /**
     * The start date of the EmploymentContract if no exact date is known
     * @name EmploymentContract#startDate_string
     * @type {String}
     */
    readonly startDate_string?: string;

    /**
     * The end date of the EmploymentContract if an exact date is known
     * @name EmploymentContract#endDate_exact
     * @type {Date}
     */
    readonly endDate_exact?: Date;

    /**
     * The end date of the EmploymentContract if no exact date is known
     * @name EmploymentContract#endDate_string
     * @type {String}
     */
    readonly endDate_string?: string;

}