import { IsString, Length } from 'class-validator';

export class NotificationParams {
    @IsString()
    @Length(0, 200)
    readonly u_id: string;
}

export class GetNotificationsQuery {
    @IsString()
    @Length(0, 200)
    readonly u_id: string;
}