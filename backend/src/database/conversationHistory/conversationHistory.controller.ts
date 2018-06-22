import { Controller, Get, Query } from '@nestjs/common';
import { ConversationHistoryService } from './conversationHistory.service';
import { GetConversationHistoryParams } from './conversationHistory.dto';

/**
 * A Controller to receive the current conversation history of an user
 * Can be accessed by calling database/conversationHistory
 */
@Controller('database/conversationHistory')
export class ConversationHistoryController {

    /**
     * Constructor for the convserationHistoryController
     * @param {ConversationHistoryService} conversationHistoryService The suiting conversationHistoryService - is injected by DI
     */
    constructor(private readonly conversationHistoryService: ConversationHistoryService) {}

    /**
     * Get a conversation history of an user
     * @param {GetConversationHistoryParams} params The GET parameters of the query - hs to contain u_id
     * @returns The conversation history of an user
     */
    @Get('conversationHistory')
    async getConversationHistory(@Query() params: GetConversationHistoryParams) {

        return this.conversationHistoryService.findConversationHistoryOfUser(params.u_id);

    }

}