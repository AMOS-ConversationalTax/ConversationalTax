/**
 * The WebSocket client for receiving notifications
 */
export class WebSocketClient {

    /**
     * The main websocket
     * @type {WebSocket}
     */
    private websocket: WebSocket;

    /**
     * A handler for the messages
     * @type {Map<string, ((data: object) => any)[]>}
     */
    private messageHandler: Map<string, ((data: object) => any)[]> = new Map<string, ((data: object) => any)[]>();

    /**
     * A handler for opeing the websocket
     * @type {(() => any)[]}
     */
    private openHandler: (() => any)[] = [];

    /**
     * The constructor for the WebSocketClient
     * @param {string} uri The uri to connect to 
     */
    constructor(private uri: string) {
        this.connect();
    }

    /**
     * Initalizes and connects the websocket 
     */
    private connect(): void {
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
     * @param {any} callback Your callback function
     */
    public registerOpenedHandler(callback: () => any): void {
        this.openHandler.push(callback);
    }

    /**
     * You may register callbacks when a message is retrieved
     * @param {string} event The name of the event you want to handle
     * @param {any} callback The callback function
     */
    public registerMessageHandler(event: string, callback: (data: object) => any): void {
        if (!this.messageHandler.has(event)) {
            this.messageHandler.set(event, []);
        }
        this.messageHandler.get(event)!.push(callback);
    }

    /**
     * Sends a message through the websocket
     * @param {string | object} msg Your message
     */
    public send(msg: string | object): void {
        if (typeof msg === 'string') {
            this.websocket.send(msg);
        } else {
            this.websocket.send(JSON.stringify(msg));
        }
    }
}