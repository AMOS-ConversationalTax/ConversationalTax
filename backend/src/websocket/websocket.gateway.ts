import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NotificationParams } from '../notifications/notifications.dto';
import { NotificationMessage } from 'conv-tax-shared/typings/Notification';
import NotificationsConfig from 'conv-tax-shared/config/notifications.config';
import { NotificationService } from '../notifications/notification-service';

@WebSocketGateway(3001)
export class WebsocketGateway {
  private static counter = 0;
  @WebSocketServer() server;

  constructor(private notificationService: NotificationService) {
  }

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
