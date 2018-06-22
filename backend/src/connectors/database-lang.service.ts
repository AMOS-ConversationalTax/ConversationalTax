import { Injectable } from '@nestjs/common';
import { ConversationHistoryService } from '../database/conversationHistory/conversationHistory.service';
import { ConversationHistory } from '../database/conversationHistory/interfaces/conversationHistory.interface';
import { ConversationHistoryParameters} from '../database/conversationHistory/interfaces/conversationHistoryParameters.interface';
import { UserService } from '../database/user/user.service';

/**
 * A connector class for the database service and the lang service
 */
@Injectable()
export class DatabaseLangService {

    /**
     * The constructor for DatabaseLangService
     * @param conversationHistoryService A ConversationHistoryService - injected by DI
     * @param userService A UserService - injected by DI
     */
    constructor( private conversationHistoryService: ConversationHistoryService,
                 private userService: UserService ) {}

    /**
     * Updates the employment contract session entity
     * @param {string} uid An id for identifing the user
     * @param {any} parameters The parameters dialogflow recognized
     * @param {string} query The query dialogflow understood
     * @param {string} answer The answer for the user
     * @param {string} intentName The detected intent uri
     * @param {string} intentDisplayName The display name of the detected intent
     * @param {string} action The action dialogflow recognized
     * @returns {Promise<string>>} A Promise containting the id of the conversation histroy entry
     */
    public async createConversationHistoryEntry( uid: string, parameters: any, query: string,
                                                 answer: string, intentName: string, intentDisplayName: string,
                                                 action: string ): Promise<string> {

        // Extract the parameters out of the dialogflowResponse
        const extractedParameters = this.extractParameters(parameters);

        // Test if user already exists
        if (!await this.userService.exists(uid)) {

            await this.userService.create(uid);

        }

        // Add a new conversation history entry to the data store
        return this.conversationHistoryService.create(uid,
                                            query,
                                            answer,
                                            {'name': intentName, 'displayName': intentDisplayName},
                                            action,
                                            extractedParameters,
                                            new Date());

    }

    /**
     * Get the conversation history of a user excluding some intent names
     * @param {string} user_id The unique id of the user
     * @param {Array<string>} intent_names The intents that are not allowed to be included
     * @returns {Promise<Array<ConversationHistory>>} A promise containing the conversationHistory entries sorted by their timestamp
     */
    public async getConversationHistoryOfUserWithoutIntents(user_id: string, intent_names: Array<string>): Promise<Array<ConversationHistory>> {

        return await this.conversationHistoryService.getConversationHistoryOfUserWithoutIntents(user_id, intent_names);

    }

    /**
     * This function extracts the name und displayName of any parameter contained in parameters
     * @param {any} parameters The parameters contained in the Dialogflow response
     * @returns {Array<ConversationHistoryParameters>} An array containing the extracted parameters
     */
    private extractParameters(parameters: any): Array<ConversationHistoryParameters> {

        // Extract the parameters out of the dialogflowResponse
        const extractedParameters: ConversationHistoryParameters[] = [];

        // Validate whether parameters include some fields
        if (parameters !== undefined && parameters !== null && parameters.hasOwnProperty('fields')) {

            // Iterate through all keys
            for (const key in parameters.fields) {

                // Validate whether key is existing for real
                if (parameters.fields.hasOwnProperty(key)) {

                    // Validate whether the field has a type (kind)
                    /* tslint:disable:no-string-literal */
                    if (parameters.fields[key].hasOwnProperty('kind')) {

                        const kindOfField: string = parameters.fields[key]['kind'];

                        if (parameters.fields[key].hasOwnProperty(kindOfField) &&
                            parameters.fields[key][kindOfField] !== '') {

                            if ( kindOfField === 'structValue') {

                                // If structValue is the kind of the field there
                                // Dialogflow uses a substructure that can be resolved by a recursive call
                                const subStructure: Array<ConversationHistoryParameters> =
                                                this.extractParameters(parameters.fields[key][kindOfField]);

                                for (const subElement of subStructure) {

                                    extractedParameters.push({name: subElement.name,
                                                              value: subElement.value});

                                }

                            } else {

                                extractedParameters.push({name: key,
                                                          value: parameters.fields[key][kindOfField]});

                            }
                        }

                    }
                    /* tslint:enable:no-string-literal */

                }

            }

        }

        return extractedParameters;

    }

}