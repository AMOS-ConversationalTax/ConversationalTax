import { WebSocketClient } from './WebSocketClient';
import Config from 'conv-tax-shared/config/config';
import { Constants } from 'expo';
import NotificationsConfig from 'conv-tax-shared/config/notifications.config';
import {NotificationMessage} from 'conv-tax-shared/typings/Notification';
import {Subject} from 'rxjs';
import RestConnection from './RestConnection';
import { Vibration } from 'react-native';
import { PushNotificationService } from './PushNotificationService';

/**
 * Singleton NotificationService
 */
export class NotificationServiceInstance {

    /**
     * A list of open notifications
     * @type {NotificationMessage[]}
     */
    public notifications: NotificationMessage[] = [];

    /**
     * A place for new notifications
     * @type {Subject<void>}
     */
    public newNotification: Subject<void> = new Subject();

    /**
     * The current count of notifications
     * @type {Subject<number>}
     */
    public notificationCount: Subject<number> = new Subject();

    /**
     * A instance of the NotificationService
     * @type {NotificationServiceInstance}
     */
    private static _instance: NotificationServiceInstance;

    /**
     * A connection to the websocket
     * @type {WebSocketClient}
     */
    private websocket: WebSocketClient;

    /**
     * A instance of the RestConnection
     * @type {RestConnection}
     */
    private restClient: RestConnection;

    /**
     * The constructor for the NotificationService
     */
    private constructor() {
        // WebSocket
        this.websocket = new WebSocketClient(Config.WEBSOCKET_URL);
        this.websocket.registerOpenedHandler(() => {
            this.subscribe();
        });
        this.websocket.registerMessageHandler(NotificationsConfig.NOTI_EVENT, (data: object) => {
            this.handleNotificationMessage(data as NotificationMessage);
        });

        this.reloadNotifications();
    }

    /**
     * Send a subscribe-event via the websocket.
     */
    private subscribe(): void {
        this.websocket.send({
            event: NotificationsConfig.SUB_NOTI_EVENT, data: {
                u_id: Constants.deviceId,
            } 
        });
    }

    /**
     * Handles incoming messages of the websocket
     * @param {NotificationMessage} data The new notification
     */
    private handleNotificationMessage(data: NotificationMessage): void {
        this.notifications.unshift(data);
        this.notificationCount.next(this.countUnread());
        this.newNotification.next();
        Vibration.vibrate(500, false);
        PushNotificationService.presentLocalNotification(data.title, data.description);
    }

    /**
     * Reloads all Notifications from the backend
     */
    public async reloadNotifications(): Promise<void> {
        this.notifications = [];
        // RestClient
        this.restClient = new RestConnection();
        const oldNotifications = await this.restClient.getNotifications();
        oldNotifications.forEach(notification => {
            this.notifications.unshift(notification);
        });
        this.newNotification.next();
        this.notificationCount.next(this.countUnread());
    }

    /**
     * Mark all notifications as read
     */
    public markAsRead(): void {
        this.restClient.markNotificationsAsRead();
        this.notifications.forEach((notification) => {
            notification.read = true;
        })
        this.notificationCount.next(0);
    }

    /**
     * Get the number of unread notifications
     * @returns {number} Number of unread notifications
     */
    public countUnread(): number {
        return this.notifications.filter(notification => !notification.read).length;
    }

    /**
     * Returns the singletons instance.
     * @returns {NotificationServiceInstance} The NotificationServiceInstance instance
     */
    public static get Instance(): NotificationServiceInstance {
        return this._instance || (this._instance = new this());
    }
}

/**
 * A instance of the NotificationService
 * @type {NotificationServiceInstance}
 */
export const NotificationService: NotificationServiceInstance = NotificationServiceInstance.Instance
