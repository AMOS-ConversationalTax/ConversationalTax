import io from 'socket.io-client';
import Config from '../config/config';

export class WebSocketClient {
    private websocket: WebSocket;

    constructor() {
        this.websocket = new WebSocket('ws://192.168.178.10:3001');
        this.websocket.addEventListener('open', () => {
            console.log('connected');
            this.websocket.send('{"event": "notifications"}');
        });
    }

    public subscribeToNotifications() {
        this.websocket.addEventListener('message', (event: MessageEvent) => {
            console.log(event.data);
        });
        this.websocket.addEventListener('error', (error: Event) => {
            console.log(error.type);
        });
    }
}