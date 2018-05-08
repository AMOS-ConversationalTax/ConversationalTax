import { rejects } from 'assert';
import axios from 'axios';

export default class RestConnection implements IConnection {

    public findById(id: string): Promise<string> {
        const url = 'https://jsonplaceholder.typicode.com/posts/1';
        const promise = new Promise<string>((resolve, reject) => {
            axios.get(url)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject('fail');
            });
        });
        return promise;
    }

    public test(): string {
        return 'test';
    }

    public create(data: ResponseData): void {
    }

    public update(data: ResponseData): void {
    }

    public delete(data: ResponseData): void {
    }
}
