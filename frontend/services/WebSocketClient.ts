export class WebSocketClient {
    private websocket: WebSocket;
    private messageHandler = new Map<string, ((data: object) => any)[]>();
    private openHandler: (() => any)[] = [];

    constructor(private uri: string) {
        this.connect();
    }

    private connect() {
        console.log('connect');
        this.websocket = new WebSocket(this.uri);

        this.websocket.addEventListener('close', () => {
            console.log('close');
            setTimeout(() => {
                this.connect();
            }, 5000);
        });

        this.websocket.addEventListener('message', (event: MessageEvent) => {
            let eventData: any;
            try {
                eventData = JSON.parse(event.data);
            } catch {
                return;
            }

            const handlers = this.messageHandler.get(eventData.event);
            if (handlers !== undefined) {
                handlers.forEach((handler) => {
                    handler(eventData.data);
                });
            }
        });

        this.websocket.addEventListener('open', () => {
            console.log('opened');
            this.openHandler.forEach((handler) => {
                handler();
            });
        });
    }

    public registerOpenedHandler(callback: () => any): void {
        this.openHandler.push(callback);
    }

    public registerMessageHandler(event: string, callback: (data: object) => any): void {
        if (!this.messageHandler.has(event)) {
            this.messageHandler.set(event, []);
        }
        this.messageHandler.get(event)!.push(callback);
    }

    public send(msg: string | object): void {
        if (typeof msg === 'string') {
            this.websocket.send(msg);
        } else {
            this.websocket.send(JSON.stringify(msg));
        }
    }
}