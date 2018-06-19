import { IsString, Length } from 'class-validator';

export class GetConversationHistoryParams {
    @IsString()
    @Length(0, 200)
    readonly u_id: string;
}
