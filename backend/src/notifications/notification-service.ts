import { Injectable } from '@nestjs/common';
import { Subject, Observable } from 'rxjs';
import { NotificationMessage } from 'conv-tax-shared/typings/Notification';
import { WsResponse } from '@nestjs/websockets';
import NotificationsConfig from 'conv-tax-shared/config/notifications.config';
import { NotificationsDBService } from '../database/notifications/notifications.service';
import { NavigatableRoutes } from 'conv-tax-shared/config/navigation.config';

/**
 * A constant containing the demo notifications we use
 * @type {NotificationMessage[]}
 */
const DEMO_NOTI: NotificationMessage[] = [
{
    title: 'Arbeitsvertrag XYZ',
    description: 'Lade jetzt den Scan deines Arbeitsvertrags hoch.',
    read: false,
    navigateTo: NavigatableRoutes.Scanner,
},
{
    title: 'Context-Demo',
    description: 'Fahre mit Context X fort.',
    read: false,
    textForDialogflow: 'Worüber haben wir gerade gesprochen?',
},
{
    title: 'Benachrichtigung',
    description: 'Erfolg! (Oder soetwas!)',
    read: false,
}];

/**
 * The class implementing the notification service
 */
@Injectable()
export class NotificationService {

    /**
     * Stores the currently active user's Observable/Subject in order to send them notifications
     * @type {Map<number, Subject<WsResponse<NotificationMessage>>>}
     */
    private userSubscriptions: Map<number, Subject<WsResponse<NotificationMessage>>>
                                = new Map<number, Subject<WsResponse<NotificationMessage>>>();

    /**
     * Stores a map from the real user ids to the websocket client ids.
     * @type {Map<string, number[]>}
     */
    private userIdToId: Map<string, number[]> = new Map<string, number[]>();

    /**
     * The constructor for the NotificationService
     * @param {NotificationsDBService} notificationDb A instance of the NotificationsDBService - injected by DI
     */
    constructor(private readonly notificationDb: NotificationsDBService) {}

    /**
     * Adds a notification for a specific user. If the user is connected via a websocket, the notification will be delivered async.
     * @param {string} userId The user's id
     * @param {NotificationMessage} notification The notification for the user.
     */
    public addNotification(userId: string, notification: NotificationMessage) {
        this.notificationDb.create(userId, notification.title, notification.description, notification.navigateTo, notification.textForDialogflow);
        const websocketClientIds = this.userIdToId.get(userId);
        websocketClientIds.forEach(id => {
            const notificationStream = this.userSubscriptions.get(id);
            if (notificationStream !== undefined) {
                notificationStream.next(this.packNotification(notification));
            }
        });
    }

    /**
     * Subscribes a user for async notifications
     * @param {number} id websocket client id
     * @param {string} userId The user's id
     * @returns {Observable<WsResponse<NotificationMessage>>} Returns an Observable through which notifications are beeing sent.
     */
    public subscribeUser(id: number, userId: string): Observable<WsResponse<NotificationMessage>> {
        const notificationStream = new Subject<WsResponse<NotificationMessage>>();
        this.userSubscriptions.set(id, notificationStream);
        if (!this.userIdToId.has(userId)) {
            this.userIdToId.set(userId, []);
        }
        this.userIdToId.get(userId).push(id);
        return notificationStream;
    }

    /**
     * Unsubscribes a user for async notifications, e.g. disconnect.
     * @param {number} id websocket client id
     */
    public unsubscribeUser(id: number) {
        this.userSubscriptions.get(id).complete();
        this.userSubscriptions.delete(id);
        this.userIdToId.forEach(ids => {
            const index = ids.indexOf(id);
            if (index >= 0) {
                ids.splice(index, 1);
            }
        });
    }

    /**
     * For debug purposes. Sends a demo notification to all users.
     */
    public emitNotification() {
        const demo = DEMO_NOTI[Math.round(Math.random() * 2)];
        this.userIdToId.forEach((websocketIds, userId) => {
            if (websocketIds.length > 0) {
                this.addNotification(userId, demo);
            }
        });
    }

    /**
     * Packs a notification the be delivered via the websocket
     * @param {NotificationMessage} notification the notification
     * @returns {WsResponse<NotificationMessage>} The websocket response
     */
    private packNotification(notification: NotificationMessage): WsResponse<NotificationMessage> {
        return {
            event: NotificationsConfig.NOTI_EVENT,
            data: notification,
        };
    }
}
