import { WebSocketClient } from './WebSocketClient';
import Config from '../config/config';
import { Constants } from 'expo';
import NotificationsConfig from 'conv-tax-shared/config/notifications.config';
import {NotificationMessage} from 'conv-tax-shared/typings/Notification';
import {Subject} from 'rxjs';
import RestConnection from './RestConnection';

/**
 * Singleton NotificationService
 */
export class NotificationService {
    public notifications: NotificationMessage[] = [];
    public newNotification: Subject<void> = new Subject();

    private static _instance: NotificationService;
    private websocket: WebSocketClient;
    private restClient: RestConnection;

    private constructor() {
        this.init();
    }
    
    private async init() {
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
        console.log(oldNotifications);
        oldNotifications.forEach(notification => {
            this.notifications.push({ title: notification.title, text: notification.description});
        })
        this.newNotification.next();
    }

    private subscribe() {
        this.websocket.send({
            event: NotificationsConfig.SUB_NOTI_EVENT, data: {
                u_id: Constants.deviceId,
            } 
        });
    }

    private handleNotificationMessage(data: NotificationMessage) {
        this.notifications.push(data);
        this.newNotification.next();
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}
