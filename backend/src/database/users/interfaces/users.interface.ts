import { Document } from 'mongoose';

/**
 * This implements the User interface used by UserService
 * @interface User
 */
export interface User extends Document {

    readonly _id: string;

}