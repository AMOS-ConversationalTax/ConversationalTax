import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ConversationHistory } from './interfaces/conversationHistory.interface';
import { conversationHistorySchema } from './schemas/conversationHistory.schema';
import DBConfig from '../dbconfig';

/**
 * This class implements the connection to the conversationHistory table in the datastore
 * @class ConversationHistoryService
 */
@Injectable()
export class ConversationHistoryService {

    /**
     * The model of the conversationHistory table
     * Implements the connection to this table, too
     * Corresponds to db.conversationHistory in MongoDB
     * @name ConversationHistoryService#conversationHistoryModel
     * @type {Model<ConversationHistory>}
     */
    private conversationHistoryModel: Model<ConversationHistory> = mongoose.model(  DBConfig.CONVERSATIONHISTORY_MODEL_PROVIDER,
                                                                                    conversationHistorySchema);

    /**
     * Create an new conversationHistory entry in the datastore - does not check if the conversationHistory entry already exists
     * @param {string} user_id - The id of the user owning the new conversationHistory entry
     * @param {string} json_entry - The conversation history entry formated as json - will not be evaluated
     * @param {Date} timestamp - The timestamp of the conversation history entry
     * @returns {Promise<string>} - A promise containing the _id of the new conversationHistory entry
     */
    async create(user_id: string, json_entry: string, timestamp: Date): Promise<string> {

        // Get a new ObjectID
        const _id: string = mongoose.Types.ObjectId();

        // No user with this id exists => create a new one
        const document: Model<ConversationHistory> = new this.conversationHistoryModel({ '_id': _id,
                                                                                         'user_id': user_id,
                                                                                         'json_entry': json_entry,
                                                                                         'timestamp': timestamp });
        await document.save();

        return _id;

    }

    /**
     * Find all conversationHistory entries of a specific user
     * @param {string} user_id - The unique id of the user
     * @returns {Promise<Array<ConversationHistory>>} - A promise containing the conversationHistory entries sorted by their timestamp
     */
    async findEmploymentContractsOfUser(user_id: string): Promise<Array<ConversationHistory>> {

        return await this.conversationHistoryModel.find({ 'user_id': user_id }).sort({'timestamp': 'desc'}).exec();

    }

}