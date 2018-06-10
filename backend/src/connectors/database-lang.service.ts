import { Injectable } from '@nestjs/common';
import { ConversationHistoryService } from '../database/conversationHistory/conversationHistory.service';
import { ConversationHistory} from '../database/conversationHistory/interfaces/conversationHistory.interface';
import { ConversationHistoryParameters} from '../database/conversationHistory/interfaces/conversationHistoryParameters.interface';

/**
 * A connector class for the database service and the lang service
 */
@Injectable()
export class DatabaseLangService {

    constructor( private conversationHistoryService: ConversationHistoryService ) {}

    /**
     * Updates the employment contract session entity
     *
     * @param {string} uid
     * An id for identifing the user
     *
     * @param {DetectIntentResponse[]} dialogflowResponse
     * The response of dialogflow
     *
     * @param {Intent} intent
     * The detected intent
     *
     * @returns {Promise<boolean>>}
     * A Promise containting the success of the creation
     *
     */
    public async createConversationHistoryEntry( uid: string, dialogflowResponse: DetectIntentResponse[],
                                                 intent: Intent, action: string ): Promise<boolean> {

        let answer = 'Keine Antwort durch Dialogflow';

        // Extract the parameters out of the dialogflowResponse
        const parameters: any = dialogflowResponse[0].queryResult.parameters;
        const extractedParameters = new Array<ConversationHistoryParameters>();

        // Validate whether parameters include some fields
        if (parameters !== null && parameters.hasOwnProperty('fields')) {

            if (dialogflowResponse[0].queryResult.hasOwnProperty('fulfillmentText') && dialogflowResponse[0].queryResult.fulfillmentText !== '') {

                answer = dialogflowResponse[0].queryResult.fulfillmentText;

            }

            // Iterate through all keys
            for (const key in parameters.fields) {

                // Validate whether key is existing for real
                if (parameters.fields.hasOwnProperty(key)) {

                    // Validate whether the field has a type (kind)
                    // Validate whether the field has property for this kind
                    // Validate whether the value property is not empty
                    /* tslint:disable:no-string-literal */
                    if (parameters.fields[key].hasOwnProperty('kind') &&
                        parameters.fields[key].hasOwnProperty(parameters.fields[key]['kind']) &&
                        parameters.fields[key][parameters.fields[key]['kind']] !== '' ) {

                        extractedParameters.push({name: key, value: parameters.fields[key][parameters.fields[key]['kind']]});

                    }
                    /* tslint:enable:no-string-literal */

                }

            }

        }

        // Add a new conversation history entry to the data store
        this.conversationHistoryService.create(uid,
                                            dialogflowResponse[0].queryResult.queryText,
                                            answer,
                                            {'name': intent.name, 'displayName': intent.displayName},
                                            action,
                                            extractedParameters,
                                            new Date());

        return true;

    }

    /**
     * Get the conversation history of a user excluding some intent names
     *
     * @param {string} user_id - The unique id of the user
     *
     * @param {Array<string>} intent_names - The intents that are not allowed to be included
     *
     * @returns {Promise<Array<ConversationHistory>>} - A promise containing the conversationHistory entries sorted by their timestamp
     *
     */
    public async getConversationHistoryOfUserWithoutIntents(user_id: string, intent_names: Array<string>): Promise<Array<ConversationHistory>> {

        return await this.conversationHistoryService.getConversationHistoryOfUserWithoutIntents(user_id, intent_names);

    }

}