import { Injectable } from '@nestjs/common';
import { IntentHandler } from './handler.abstract';
import { DatabaseLangService } from 'connectors/database-lang.service';
import { ConversationHistory } from 'database/conversationHistory/interfaces/conversationHistory.interface';
import { ExplanationService } from '../../explanation/explanation.service';

@Injectable()
export class HelpIntentHandler extends IntentHandler{

    constructor(private databaseLangService: DatabaseLangService, private explanationService: ExplanationService){
        super();
    }

    public async handle(intentData: IIntentData) {
         // Return Help
        const history: Array<ConversationHistory> = await this.databaseLangService.getConversationHistoryOfUserWithoutIntents(intentData.user,
                                                                                                                              intentData.intentList);

        if (history.length > 0) {
            const previousResponse = history[0];
            const text = this.explanationService.getHelpText(previousResponse.intent, previousResponse.action);
            return { text };
        }

        return { text: 'Es gibt keine letzte Anfrage zu der ich dir eine Hilfestellung geben könnte' };
    }
}