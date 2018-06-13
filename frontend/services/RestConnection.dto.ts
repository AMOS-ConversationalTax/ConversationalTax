export interface NotificationResponse {

    /**
     * The unique id of the Notification
     * @name Notification#_id
     * @type {string}
     */
    readonly _id: string;

    /**
     * The id of the user
     * @name Notification#user_id
     * @type {string}
     */
    readonly user_id: string;

    /**
     * The title of the notification
     * @name Notification#description
     * @type {string}
     */
    readonly title: string;

    /**
     * The description of the notification
     * @name Notification#description
     * @type {string}
     */
    readonly description: string;

    /**
     * Has the notification been read?
     * @name Notification#read
     * @type {boolean}
     */
    readonly read: boolean;

}