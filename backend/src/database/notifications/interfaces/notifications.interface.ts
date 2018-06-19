import { Document } from 'mongoose';
import { NavigatableRoutes } from 'conv-tax-shared/config/navigation.config';

/**
 * This implements the Notification interface used by NotificationService
 * @interface Notification
 */
export interface Notification extends Document {

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

    /**
     * This property defines to which screen the frontend should navigate on a click
     * @name Notification#navigateTo
     * @type {NavigatableRoutes}
     */
    readonly navigateTo: NavigatableRoutes;

    /**
     * The text to send to dialogFlow on a click
     * @name Notification#description
     * @type {string}
     */
    readonly textForDialogflow: string;
}