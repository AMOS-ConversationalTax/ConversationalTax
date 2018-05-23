import { rejects } from 'assert';
import axios from 'axios';
import Config from '../config/config';
import Expo from 'expo';
import * as fs from 'fs';

export default class RestConnection implements IConnection {

    public read(): Promise<string> {
        const url = Config.SERVER_URL;
        const promise = new Promise<string>((resolve, reject) => {
            axios.get(url)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject('reading failed');
            });
        });
        return promise;
    }

    public create(data: {}): Promise<string> {
        const url = Config.SERVER_URL;
        const promise = new Promise<string>((resolve, reject) => {
            axios.post(url, data)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject('creating failed');
            });
        });
        return promise;
    }

    public update(data: string): Promise<string> {
        const url = Config.SERVER_URL;
        const promise = new Promise<string>((resolve, reject) => {
            axios.put(url, data)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject('updating failed');
            });
        });
        return promise;
    }

    public delete(): Promise<string> {
        const url = Config.SERVER_URL;
        const promise = new Promise<string>((resolve, reject) => {
            axios.delete(url)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject('deleting failed');
            });
        });
        return promise;
    }

    /**
     * Uploads an audio file to the backend
     * @param {string} uri - The (Expo.io) filepath of the file to be uploaded 
     */
    async uploadAudioAsync(uri: string) {
        let platform: 'ios' | 'android';
        if (Expo.Constants.platform.android !== undefined) {
            platform = 'android';
        } else if (Expo.Constants.platform.ios !== undefined) {
            platform = 'ios';
        } else {
            console.error('Could not identify current platform');
            return;
        }
        let apiUrl = `${Config.SERVER_URL}/lang/audio_upload?platform=${platform}`; 
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];

        let formData = new FormData();
        formData.append('file', {
            uri,
            name: `recording.${fileType}`,
            type: `audio/x-${fileType}`,
        });

        let options = {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        };

        try {
            return await fetch(apiUrl, options).then((response) => response.json());
        } catch (e) {
            console.error(`Could not upload audio recording. ${e}`);
        }
    }
}
