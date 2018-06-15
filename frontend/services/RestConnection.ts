import axios from 'axios';
import Config from 'conv-tax-shared/config/config';
import Expo from 'expo';
import { NotificationResponse} from './RestConnection.dto';

const DEFAULT_OPTIONS = { 'timeout': 10000 };

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
        let apiUrl = `${Config.SERVER_URL}/lang/audio_upload?platform=${platform}&u_id=${Expo.Constants.deviceId}`; 
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

    /**
     * Get the current conversation history of the user
     * @returns {Promise<any>} - The json containing the users current conversation history
     */
    public async getConversationHistory(): Promise<any> {

        const url = `${Config.SERVER_URL}/database/conversationHistory/conversationHistory?u_id=${Expo.Constants.deviceId}`;

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

    public getNotifications(): Promise<NotificationResponse[]> {
        const url = `${Config.SERVER_URL}/notifications?u_id=${Expo.Constants.deviceId}`;
        const promise = new Promise<NotificationResponse[]>((resolve, reject) => {
            axios.get(url, DEFAULT_OPTIONS)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject('Couldn\'t get the old Notifications');
                });
        });
        return promise;
    }

    public markNotificationsAsRead(): Promise<void> {
        const url = `${Config.SERVER_URL}/notifications/markAsRead?u_id=${Expo.Constants.deviceId}`;
        const promise = new Promise<void>((resolve, reject) => {
            axios.get(url, DEFAULT_OPTIONS)
                .then((response) => {
                    resolve();
                })
                .catch((error) => {
                    reject('Couldn\'t mark the Notifications as read');
                });
        });
        return promise;
    }

    public emitDebugNotificationToAllUsers(): Promise<void> {
        const url = `${Config.SERVER_URL}/notifications/emit-demo`;
        const promise = new Promise<void>((resolve, reject) => {
            axios.get(url, DEFAULT_OPTIONS)
                .then((response) => {
                    resolve();
                })
                .catch((error) => {
                    reject('Couldn\'t emit a debug Notification');
                });
        });
        return promise;
    }
}
