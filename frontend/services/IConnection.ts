interface IConnection {
    findById(id: string): Promise<string>;
    create(data: ResponseData): void;
    update(data: ResponseData): void;
    delete(data: ResponseData): void;
}
