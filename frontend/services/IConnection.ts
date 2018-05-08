interface IConnection {
    findById(id: string): ResponseData;
    create(data: ResponseData): void;
    update(data: ResponseData): void;
    delete(data: ResponseData): void;
}
