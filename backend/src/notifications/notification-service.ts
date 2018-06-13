import { Injectable } from '@nestjs/common';
import { Subject, Observable, from } from 'rxjs';
import { NotificationMessage } from 'conv-tax-shared/typings/Notification';
import { WsResponse } from '@nestjs/websockets';
import NotificationsConfig from 'conv-tax-shared/config/notifications.config';
import { map } from 'rxjs/operators';
import { NotificationsDBService } from '../database/notifications/notifications.service';

const DEMO_NOTI: NotificationMessage = {
        title: 'Title',
        text: 'Beschreibungstext',
        read: false,
};

@Injectable()
export class NotificationService {
    // Stores the currently active user's Observable/Subject in order to send them notifications
    private userSubscriptions = new Map<number, Subject<WsResponse<NotificationMessage>>>();
    // Stores a map from the real user ids to the websocket client ids.
    private userIdToId = new Map<string, number[]>();

    constructor(private readonly notificationDb: NotificationsDBService) {}

    /**
     * Adds a notification for a specific user. If the user is connected via a websocket, the notification will be delivered async.
     * @param userId The user's id
     * @param notification The notification for the user.
     */
    public addNotification(userId: string, notification: NotificationMessage) {
        this.notificationDb.create(userId, notification.title, notification.text);
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
     * @param id websocket client id
     * @param userId The user's id
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
     * @param id websocket client id
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
        this.userIdToId.forEach((websocketIds, userId) => {
            if (websocketIds.length > 0) {
                this.addNotification(userId, DEMO_NOTI);
            }
        });
    }

    /**
     * Packs a notification the be delivered via the websocket
     * @param notification the notification
     * @returns {WsResponse<NotificationMessage>} The websocket response
     */
    private packNotification(notification: NotificationMessage): WsResponse<NotificationMessage> {
        return {
            event: NotificationsConfig.NOTI_EVENT,
            data: notification,
        };
    }
}
