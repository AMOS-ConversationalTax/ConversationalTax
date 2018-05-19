import { Document } from 'mongoose';

/**
 * This implements the User interface used by UserService
 * @interface User
 */
export interface User extends Document {

    /**
     * The unique id of the User
     * @name User#_id
     * @type {string}
     */
    readonly _id: string;

}