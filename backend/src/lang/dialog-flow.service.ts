import { Injectable } from '@nestjs/common';
import * as dialogflow from 'dialogflow';
import Config from './../../config/config';

const PROJECT_ID = 'test-c7ec0';
const LANG_CODE = 'de-DE';

/**
 * A wrapper class around the dialogflow sdk.
 */
@Injectable()
export class DialogFlowService {
    private sessionClient: any;

    constructor() {
        if (this.hasValidConfig()) {
            this.sessionClient = new dialogflow.SessionsClient({ credentials: Config.DIALOGFLOW_KEY });
        }
    }

    private hasValidConfig(): boolean {
        const validConfig = Config.DIALOGFLOW_KEY.private_key.length > 0;
        if (!validConfig) {
            // tslint:disable:no-console
            console.error('################################');
            console.error('################################');
            console.error('################################');
            console.error('Invalid keyfile for Dialogflow. It has to be specified in config/config.ts. Skipping...');
            console.error('################################');
            console.error('################################');
            console.error('################################');
        }
        return validConfig;
    }

    /**
     * Sends a request to detect the intent to DialogFlow
     *
     * @param {string} inputText
     * The user input as a text
     *
     * @param {string} u_id
     * An id for identifing the user and his session
     *
     * @returns {Promise<DetectIntentResponse>}
     * The answer of DialogFlow's API as a Promise
     */
    public detectTextIntent(inputText: string, u_id: string): Promise<DetectIntentResponse[]> {
        const request: DetectIntentRequest = {
            queryInput: {
                text: {
                    text: inputText,
                    languageCode: LANG_CODE,
                },
            },
        };

        const sessionPath = this.sessionClient.sessionPath(PROJECT_ID, u_id);

        return this.sessionClient.detectIntent({ session: sessionPath, ...request });
    }

    /**
     * Sends a request to detect the intent to DialogFlow
     *
     * @param {string} encoding
     * The encoding of the audio. See DialogFlow docs
     *
     * @param {number} sampleRate
     * SampleRate of the audio
     *
     * @param {string} inputAudio
     * The user input as an base64 audio string
     *
     * @param {string} u_id
     * An id for identifing the user and his session
     *
     * @returns {Promise<DetectIntentResponse>}
     * The answer of DialogFlow's API as a Promise
     */
    public detectAudioIntent(encoding: string, sampleRate: number, inputAudio: string, u_id: string): Promise<DetectIntentResponse[]> {
        const request: DetectIntentRequest = {
            queryInput: {
                audioConfig: {
                    audioEncoding: encoding,
                    sampleRateHertz: sampleRate,
                    languageCode: LANG_CODE,
                },
            },
            inputAudio,
        };

        const sessionPath: any = this.sessionClient.sessionPath(PROJECT_ID, u_id);

        return this.sessionClient.detectIntent({ session: sessionPath, ...request });
    }

    /**
     * Extracts the answer of DialogFlow to read it out to the user.
     * @param detectIntent Response from DialogFlow
     * @returns {string} The text from DialogFlow
     */
    public extractResponseText(detectIntent: DetectIntentResponse): string {
        return detectIntent.queryResult.fulfillmentText;
    }

    /**
     * Extracts the Intent of DialogFlow response.
     * @param detectIntent Response from DialogFlow
     * @returns {Intent} The Intent Object of the response
     */
    public extractResponseIntent(detectIntent: DetectIntentResponse): Intent {
        return detectIntent.queryResult.intent;
    }
}
