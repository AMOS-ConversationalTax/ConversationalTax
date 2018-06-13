export class WebSocketClient {
    private websocket: WebSocket;
    private messageHandler = new Map<string, ((data: object) => any)[]>();
    private openHandler: (() => any)[] = [];

    constructor(private uri: string) {
        this.connect();
    }

    /**
     * Initalizes and connects the websocket 
     */
    private connect() {
        this.websocket = new WebSocket(this.uri);

        this.websocket.addEventListener('close', () => {
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
            this.openHandler.forEach((handler) => {
                handler();
            });
        });
    }

    /**
     * You may register callbacks when the connection is established
     * @param callback Your callback function
     */
    public registerOpenedHandler(callback: () => any): void {
        this.openHandler.push(callback);
    }

    /**
     * You may register callbacks when a message is retrieved
     * @param event The name of the event you want to handle
     * @param callback The callback function
     */
    public registerMessageHandler(event: string, callback: (data: object) => any): void {
        if (!this.messageHandler.has(event)) {
            this.messageHandler.set(event, []);
        }
        this.messageHandler.get(event)!.push(callback);
    }

    /**
     * Sends a message through the websocket
     * @param msg Your message
     */
    public send(msg: string | object): void {
        if (typeof msg === 'string') {
            this.websocket.send(msg);
        } else {
            this.websocket.send(JSON.stringify(msg));
        }
    }
}