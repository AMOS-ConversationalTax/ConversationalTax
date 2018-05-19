import * as mongoose from 'mongoose';

/**
 * The schema of the user table
 * @name userSchema
 * @type {mongoose.Schema}
 */
export const userSchema: mongoose.Schema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
});