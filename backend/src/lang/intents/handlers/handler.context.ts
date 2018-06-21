import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';
import { DatabaseLangService } from 'connectors/database-lang.service';
import { ConversationHistory } from 'database/conversationHistory/interfaces/conversationHistory.interface';
import { ExplanationService, IGNORE_INTENTS } from '../../explanation/explanation.service';

@Injectable()
export class ContextIntentHandler extends IntentHandler{

    constructor(private databaseLangService: DatabaseLangService, private explanationService: ExplanationService){
        super();
    }

    /**
     * Proccesses a given DialogFlow Reponse
     * @param intentData Parts of the DialogFlow response
     * @returns {Promise<ReturnText>} The text for the user
     */
    public async handle(intentData: IIntentData): Promise<ReturnText> {
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