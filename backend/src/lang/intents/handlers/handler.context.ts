import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';
import { DatabaseLangService } from 'connectors/database-lang.service';
import { ConversationHistory } from 'database/conversationHistory/interfaces/conversationHistory.interface';
import { ExplanationService, IGNORE_INTENTS } from '../../explanation/explanation.service';

/**
 * Class to handle a specific Intent
 */
@Injectable()
export class ContextIntentHandler extends IntentHandler{

    constructor(private databaseLangService: DatabaseLangService, private explanationService: ExplanationService){
        super();
    }

    /**
     * Proccesses a given DialogFlow Reponse
     * @param {IIntentData} intentData Parts of the DialogFlow response
     * @returns {Promise<ReturnText | undefined>} The text for the user or undefined.
     */
    public async handle(intentData: IIntentData): Promise<ReturnText | undefined> {
        const history: ConversationHistory[] = await this.databaseLangService
            .getConversationHistoryOfUserWithoutIntents(intentData.user, IGNORE_INTENTS);
        if (history.length > 0) {
            const previousResponse = history[0];
            const text = this.explanationService.getContextExplanation(previousResponse.intent);
            return { text };
        }
        return { text: 'Es gibt keine letzte Anfrage zu der ich dir den Kontext nennen könnte' };
    }
}