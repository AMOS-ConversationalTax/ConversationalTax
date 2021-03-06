import { Notifications } from 'expo';
import autobind from 'autobind-decorator';
import { NavigationService } from './NavigationService';
import { NavigatableRoutes } from 'conv-tax-shared/config/navigation.config';

/**
 * Singleton Wrapper for (local) Push Notifications
 */
export class PushNotificationServiceInstance {

    /**
     * A instance of the PushNotificationServiceInstance
     * @type {PushNotificationServiceInstance}
     */
    private static _instance: PushNotificationServiceInstance;

    /**
     * A constructor for the PushNotificationServiceInstance 
     */
    constructor() {
        Notifications.addListener(this.handleNotificationSelect);
    }

    /**
     * Handles 'incoming' notification. For example if an user clicks on a notification
     * @param {Notifications.Notification} notification The incoming notification object
     */
    @autobind
    private handleNotificationSelect(notification: Notifications.Notification): void {
        if (notification.origin === 'selected') {
            NavigationService.navigate(NavigatableRoutes.Notifications);
        }
    }

    /**
     * Presents a local push notification
     * @param {string} title Title of the notification
     * @param {string} body Text of the notification
     */
    public presentLocalNotification(title: string, body: string): void {
        const pushNotification: Notifications.LocalNotification = {title, body};
        Notifications.presentLocalNotificationAsync(pushNotification)
    }

    /**
     * Returns the singletons instance.
     * @returns {PushNotificationServiceInstance} The PushNotificationServiceInstance instance
     */
    public static get Instance(): PushNotificationServiceInstance {
        return this._instance || (this._instance = new this());
    }
}

/**
 * A main instance of the PushNotificationService
 * @type {PushNotificationServiceInstance}
 */
export const PushNotificationService: PushNotificationServiceInstance = PushNotificationServiceInstance.Instance