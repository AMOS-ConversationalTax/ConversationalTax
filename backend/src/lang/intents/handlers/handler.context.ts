import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';
import { DatabaseLangService } from 'connectors/database-lang.service';
import { ConversationHistory } from 'database/conversationHistory/interfaces/conversationHistory.interface';
import { ExplanationService } from '../../explanation/explanation.service';

@Injectable()
export class ContextIntentHandler extends IntentHandler{

    constructor(private databaseLangService: DatabaseLangService, private explanationService: ExplanationService){
        super();
    }

    public async handle(intentData: IIntentData): Promise<ReturnText | undefined> {
        // Return Context
        const history: Array<ConversationHistory> = await this.databaseLangService.getConversationHistoryOfUserWithoutIntents(intentData.user,
                                                                                                                            intentData.intentList);
        if (history.length > 0) {
            const previousResponse = history[0];
            const text = this.explanationService.getContextExplanation(previousResponse.intent);
            return { text };
        }
        return { text: 'Es gibt keine letzte Anfrage zu der ich dir den Kontext nennen könnte' };
    }
}