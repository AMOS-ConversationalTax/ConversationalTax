import { Injectable } from '@nestjs/common';
import { Subject, Observable, from } from 'rxjs';
import { NotificationMessage } from 'conv-tax-shared/typings/Notification';
import { WsResponse } from '@nestjs/websockets';
import NotificationsConfig from 'conv-tax-shared/config/notifications.config';
import { map } from 'rxjs/operators';

@Injectable()
export class NotificationService {
    private userSubscriptions = new Map<number, Subject<WsResponse<NotificationMessage>>>();
    // private userSubscriptions: Subject<WsResponse<NotificationMessage>>[] = [];

    public subscribeUser(id: number): Observable<WsResponse<NotificationMessage>> {
        console.log(`Adding User ${id}`);
        const observable = new Subject<WsResponse<NotificationMessage>>();
        this.userSubscriptions.set(id, observable);
        return observable;
    }

    public unsubscribeUser(id: number) {
        this.userSubscriptions.get(id).complete();
        this.userSubscriptions.delete(id);
        console.log(`Removing User ${id}`);
    }

    public emitNotification() {
        this.userSubscriptions.forEach((observable) => {
            observable.next(this.dummyNotification());
        });
    }

    private dummyNotification(): WsResponse<NotificationMessage> {
        const event = NotificationsConfig.NOTI_EVENT;
        const response: NotificationMessage = {
            title: 'Title',
            text: 'Beschreibungstext',
        };

        return { event, data: response };
    }
}
