import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse, WsException } from '@nestjs/websockets';
import { Observable, from } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { NotificationParams } from './notifications.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationMessage } from 'conv-tax-shared/typings/Notification';
import NotificationsConfig from 'conv-tax-shared/config/notifications.config';
import { NotificationService } from './notification-service';

@WebSocketGateway(3001)
export class NotificationsGateway {
  private static counter = 0;
  @WebSocketServer() server;

  constructor(private notificationService: NotificationService) {
  }

  @SubscribeMessage(NotificationsConfig.SUB_NOTI_EVENT)
  onEvent(client: any, data: NotificationParams): Observable<WsResponse<NotificationMessage>> {
    const id = NotificationsGateway.counter++;

    client._socket.on('close', () => {
      this.notificationService.unsubscribeUser(id);
    });

    return this.notificationService.subscribeUser(id).pipe(
      filter(notification => client.readyState === 1),
    );
  }
}
