import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NotificationParams } from '../notifications/notifications.dto';
import { NotificationMessage } from 'conv-tax-shared/typings/Notification';
import NotificationsConfig from 'conv-tax-shared/config/notifications.config';
import { NotificationService } from '../notifications/notification-service';

/**
 * A class implementing a websocket gateway currently in use for notifications
 */
@WebSocketGateway(3001)
export class WebsocketGateway {
  /**
   * A counter used for internal reasons
   * @type {number}
   */
  private static counter: number = 0;

  /**
   * The websocket server injected by Nest.js
   * @type {any}
   */
  @WebSocketServer() server: any;

  /**
   * The constructor of the WebsocketGateway
   * @param {NotificationService} notificationService A instance of the NotificationService - injected by DI
   */
  constructor(private notificationService: NotificationService) {
  }

  /**
   * Event handler for onEvent
   * @param {any} client The client that subscribes to the handler
   * @param {NotificationParams} data The params containing the uid of the user that subscribes
   * @returns {Observable<WsResponse<NotificationMessage>>} The observable for the user
   */
  @SubscribeMessage(NotificationsConfig.SUB_NOTI_EVENT)
  onEvent(client: any, data: NotificationParams): Observable<WsResponse<NotificationMessage>> {
    const id = WebsocketGateway.counter++;

    client._socket.on('close', () => {
      this.notificationService.unsubscribeUser(id);
    });

    return this.notificationService.subscribeUser(id, data.u_id).pipe(
      filter(notification => client.readyState === 1),
    );
  }
}
