import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';
import { DatabaseLangService } from 'connectors/database-lang.service';
import { ConversationHistory } from 'database/conversationHistory/interfaces/conversationHistory.interface';
import { ExplanationService, IGNORE_INTENTS } from '../../explanation/explanation.service';

@Injectable()
export class HelpIntentHandler extends IntentHandler{

    constructor(private databaseLangService: DatabaseLangService, private explanationService: ExplanationService){
        super();
    }

    /**
     * Proccesses a given DialogFlow Reponse
     * @param intentData Parts of the DialogFlow response
     * @returns {Promise<ReturnText | undefined>} The text for the user or undefined.
     */
    public async handle(intentData: IIntentData): Promise<ReturnText | undefined> {
        const history: ConversationHistory[] = await this.databaseLangService
            .getConversationHistoryOfUserWithoutIntents(intentData.user, IGNORE_INTENTS);

        if (history.length > 0) {
            const previousResponse = history[0];
            const text = this.explanationService.getHelpText(previousResponse.intent, previousResponse.action);
            return { text };
        }

        return { text: 'Es gibt keine letzte Anfrage zu der ich dir eine Hilfestellung geben könnte' };
    }
}