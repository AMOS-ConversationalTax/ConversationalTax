import { WebSocketClient } from './WebSocketClient';
import Config from 'conv-tax-shared/config/config';
import { Constants } from 'expo';
import NotificationsConfig from 'conv-tax-shared/config/notifications.config';
import {NotificationMessage} from 'conv-tax-shared/typings/Notification';
import {Subject} from 'rxjs';
import RestConnection from './RestConnection';
import { Vibration } from 'react-native';

/**
 * Singleton NotificationService
 */
export class NotificationServiceInstance {
    public notifications: NotificationMessage[] = [];
    public newNotification: Subject<void> = new Subject();
    public notificationCount: Subject<number> = new Subject();

    private static _instance: NotificationServiceInstance;
    private websocket: WebSocketClient;
    private restClient: RestConnection;

    private constructor() {
        this.init();
    }
    
    /**
     * Establishes a websocket connection and fetches old notifications via the rest API.
     */
    private async init(): Promise<void> {
        // WebSocket
        this.websocket = new WebSocketClient(Config.WEBSOCKET_URL);
        this.websocket.registerOpenedHandler(() => {
            this.subscribe();
        });
        this.websocket.registerMessageHandler(NotificationsConfig.NOTI_EVENT, (data: object) => {
            this.handleNotificationMessage(data as NotificationMessage);
        });
        // RestClient
        this.restClient = new RestConnection();
        const oldNotifications = await this.restClient.getNotifications();
        oldNotifications.forEach(notification => {
            this.notifications.unshift({ title: notification.title, text: notification.description, read: notification.read });
        })
        this.newNotification.next();
        this.notificationCount.next(this.countUnread());
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
     * @param data The new notification
     */
    private handleNotificationMessage(data: NotificationMessage): void {
        this.notifications.unshift(data);
        this.notificationCount.next(this.countUnread());
        this.newNotification.next();
        Vibration.vibrate(500, false);
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

export const NotificationService = NotificationServiceInstance.Instance
