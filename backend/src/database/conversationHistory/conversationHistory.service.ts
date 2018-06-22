import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConversationHistory } from './interfaces/conversationHistory.interface';
import { ConversationHistoryParameters } from './interfaces/conversationHistoryParameters.interface';
import { ConversationHistoryIntent } from './interfaces/conversationHistoryIntent.interface';
import DBConfig from '../dbconfig';

/**
 * This class implements the connection to the conversationHistory table in the datastore
 * @class ConversationHistoryService
 */
@Injectable()
export class ConversationHistoryService {

    /**
     * Constructor - is used for DI of the Model
     * @param {Model<ConversationHistory>} conversationHistoryModel The model of the conversationHistory table
     */
    constructor(@InjectModel(DBConfig.CONVERSATIONHISTORY_MODEL_PROVIDER) private readonly conversationHistoryModel: Model<ConversationHistory>) {}

    /**
     * Create an new conversationHistory entry in the datastore - does not check if the conversationHistory entry already exists
     * @param {string} user_id - The id of the user owning the new conversationHistory entry
     * @param {string} query - The (recognized) query of the user in text form
     * @param {string} answer - The text answer of dialogflow
     * @param {ConversationHistoryIntent} intent - The detected intent
     * @param {string} action - The action computed by Dialogflow
     * @param {Array<ConversationHistoryParameters>} parameters - The detected parameters
     * @param {Date} timestamp - The timestamp of the conversation history entry
     * @returns {Promise<string>} - A promise containing the _id of the new conversationHistory entry
     */
    async create(user_id: string, query: string, answer: string, intent: ConversationHistoryIntent, action: string,
                 parameters: Array<ConversationHistoryParameters>, timestamp: Date): Promise<string> {

        // Get a new ObjectID
        const _id: string = mongoose.Types.ObjectId();

        // No user with this id exists => create a new one
        const document: Model<ConversationHistory> = new this.conversationHistoryModel({ '_id': _id,
                                                                                         'user_id': user_id,
                                                                                         'query': query,
                                                                                         'answer': answer,
                                                                                         'intent': intent,
                                                                                         'action': action,
                                                                                         'parameters': parameters,
                                                                                         'timestamp': timestamp });
        await document.save();

        return _id;

    }

    /**
     * Find all conversationHistory entries of a specific user
     *
     * @param {string} user_id - The unique id of the user
     *
     * @returns {Promise<Array<ConversationHistory>>} - A promise containing the conversationHistory entries sorted by their timestamp
     */
    async findConversationHistoryOfUser(user_id: string): Promise<Array<ConversationHistory>> {

        return await this.conversationHistoryModel.find({ 'user_id': user_id }).sort({'timestamp': 'desc'}).exec();

    }

    /**
     * Find all conversationHistory entries of a specific user excluding some intent names
     *
     * @param {string} user_id - The unique id of the user
     *
     * @param {Array<string>} intent_names - The intents that are not allowed to be included
     *
     * @returns {Promise<Array<ConversationHistory>>} - A promise containing the conversationHistory entries sorted by their timestamp
     */
    async getConversationHistoryOfUserWithoutIntents(user_id: string, intent_names: Array<string>): Promise<Array<ConversationHistory>> {

        return await this.conversationHistoryModel.find({ 'user_id': user_id, 'intent.name': { '$nin': intent_names } })
                                                  .sort({ 'timestamp': 'desc' }).exec();

    }

}