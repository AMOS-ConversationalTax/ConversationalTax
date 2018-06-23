import { IsString, Length } from 'class-validator';

/**
 * A class wrapping the notification params of a query
 */
export class NotificationParams {
    /**
     * The u_id of the user who owns the notifications
     * @type {string}
     */
    @IsString()
    @Length(0, 200)
    readonly u_id: string;
}

/**
 * A class wrapping the params of a GetNotifications query
 */
export class GetNotificationsQuery {
    /**
     * The u_id of the user who owns the notifications
     * @type {string}
     */
    @IsString()
    @Length(0, 200)
    readonly u_id: string;
}