import { rejects } from 'assert';
import axios from 'axios';

export default class RestConnection implements IConnection {

    public read(): Promise<string> {
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

    public create(data: {}): Promise<string> {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        const promise = new Promise<string>((resolve, reject) => {
            axios.post(url, data)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject('fail');
            });
        });
        return promise;
    }

    public update(data: string): Promise<string> {
    }

    public delete(data: string): Promise<string> {
    }
}
