interface IConnection {
    read(): Promise<string>;
    create(data: {}): Promise<string>;
    update(data: string): Promise<string>;
    delete(data: string): Promise<string>;
}
