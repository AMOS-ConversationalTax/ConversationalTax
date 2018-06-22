import { IsString, Length } from 'class-validator';

/**
 * A class capsuling the parameters for getConversationHistory
 */
export class GetConversationHistoryParams {
    /**
     * The U_ID of the user that wants to get the conversation History
     */
    @IsString()
    @Length(0, 200)
    readonly u_id: string;
}
