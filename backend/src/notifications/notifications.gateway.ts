import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse, WsException } from '@nestjs/websockets';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { NotificationParams } from './notifications.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@WebSocketGateway(3001)
export class NotificationsGateway {
  @WebSocketServer() server;

  @SubscribeMessage('notifications')
  onEvent(client, data: NotificationParams): Observable<WsResponse<number>> {

    //throw new WsException('Invalid credentials.');
    const event = 'events';
    const response = [1, 2, 3];
    //console.log(data);

    return from(response).pipe(map(res => ({ event, data: res })));
  }
}
