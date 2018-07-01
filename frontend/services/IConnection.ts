/**
 * Implements a simple CRUD interface
 * @interface IConnection
 */
interface IConnection {
    read(): Promise<string>;
    create(data: {}): Promise<string>;
    update(data: {}): Promise<string>;
    delete(): Promise<string>;
}
