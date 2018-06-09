import { Controller, Get, Post, Param, Put, Body, Query } from '@nestjs/common';
import { ConversationHistoryService } from './conversationHistory.service';
import { GetConversationHistoryParams } from './conversationHistory.dto';

@Controller('database/conversationHistory')
export class ConversationHistoryController {

    constructor(private readonly conversationHistoryService: ConversationHistoryService) {}

    @Get('conversationHistory')
    async getConversationHistory(@Query() params: GetConversationHistoryParams) {

        return this.conversationHistoryService.findEmploymentContractsOfUser(params.u_id);

    }

}