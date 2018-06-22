import axios from 'axios';
import Config from 'conv-tax-shared/config/config';
import Expo from 'expo';
import { NotificationMessage } from 'conv-tax-shared/typings/Notification';

/**
 * A array containing some default options
 * @type {any}
 */
const DEFAULT_OPTIONS: any = { 'timeout': 10000 };

/**
 * Implements a default REST connection
 */
export default class RestConnection implements IConnection {
    
    /**
     * Default read operation to REST api
     * @returns {Promise<string>} The output of the read operation
     */
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

    /**
     * Default create operation to the REST api
     * @param {{}} data The data to be created by the REST endpoint
     * @returns {Promise<string>} The output of the create operation 
     */
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

    /**
     * Default update operation to the REST api
     * @param {string} data The data to be updated by the REST endpoint
     * @returns {Promise<string>} The output of the update operation
     */
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

    /**
     * Default delete operation to the REST api
     * @returns {Promise<string>} The output of the delete operation
     */
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
     * @returns {Promise<any>} The answer of the backend
     */
    async uploadAudioAsync(uri: string): Promise<any> {
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

        // TS things the below append() call is invalid. However it works. Therefore, we trick TS here by setting the FormData to type any.
        let formData = new FormData() as any;
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
     * Uploads a text to the backend
     * @param {string} text The text that should be sent.
     * @returns {Promise<any>} The answer of the backend
     */
    async uploadTextAsync(text: string): Promise<any> {
        const url = `${Config.SERVER_URL}/lang/text?u_id=${Expo.Constants.deviceId}`; 

        const promise = new Promise<string>((resolve, reject) => {
            axios.post(url, { textInput: text })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject('Text upload failed' + error);
                });
        });

        return promise;
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

    /**
     * Gets old notifications of the user
     * @returns {Promise<NotificationMessage[]>} Array of notifications
     */
    public getNotifications(): Promise<NotificationMessage[]> {
        const url = `${Config.SERVER_URL}/notifications?u_id=${Expo.Constants.deviceId}`;
        const promise = new Promise<NotificationMessage[]>((resolve, reject) => {
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

    /**
     * Tells the backend to mark all notifications as read
     * @returns {Promise<void>} Returns as soon as the request has finished
     */
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

    /**
     * For debuggin purposes; Tells the backend to emit a demo notification
     * @returns {Promise<void>} Returns as soon as the request has finished
     */
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
