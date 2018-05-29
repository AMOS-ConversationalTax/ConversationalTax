import { Injectable } from '@nestjs/common';
import * as dialogflow from 'dialogflow';
import Config from './../../config/config';
import { SessionEntity } from './dialog-flow.dto';
import { DatabaseDialogFlowService } from '../connectors/database-dialogflow.service';
import * as grpc from 'grpc';

const PROJECT_ID = 'test-c7ec0';
const LANG_CODE = 'de-DE';

/**
 * A wrapper class around the dialogflow sdk.
 */
@Injectable()
export class DialogFlowService {
    private sessionClient: any;
    private sessionEntityTypesClient: any;
    private contextsClient: any;

    constructor(private databaseDialogflowConnector: DatabaseDialogFlowService) {
        if (this.hasValidConfig()) {
            this.sessionClient = new dialogflow.SessionsClient({ credentials: Config.DIALOGFLOW_KEY });
            this.sessionEntityTypesClient = new dialogflow.SessionEntityTypesClient();
            this.contextsClient = new dialogflow.ContextsClient();
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
    public async detectTextIntent(inputText: string, u_id: string): Promise<DetectIntentResponse[]> {

        // Set session entities at dialogflow
        this.createSessionEntityType(   "EmploymentContracts",
                                        await this.databaseDialogflowConnector.getExistingContractsOfUser(u_id),
                                        u_id);

        // Send request to dialogflow
        const request: DetectIntentRequest = {
            queryInput: {
                text: {
                    text: inputText,
                    languageCode: LANG_CODE,
                },
            },
        };

        const sessionPath = this.sessionClient.sessionPath(PROJECT_ID, u_id);

        return await this.sessionClient.detectIntent({ session: sessionPath, ...request });

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
    public async detectAudioIntent(encoding: string, sampleRate: number, inputAudio: string, u_id: string): Promise<DetectIntentResponse[]> {

        // Set session entities at dialogflow
        this.createSessionEntityType(   "EmploymentContracts",
                                        await this.databaseDialogflowConnector.getExistingContractsOfUser(u_id),
                                        u_id);

        // Send request to dialogflow
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

        return await this.sessionClient.detectIntent({ session: sessionPath, ...request });

    }

    /**
     * Extracts the answer of DialogFlow to read it out to the user.
     * @param detectIntent Response from DialogFlow
     */
    public extractResponseText(detectIntent: DetectIntentResponse): string {

        return detectIntent.queryResult.fulfillmentText;

    }

    /**
     * Creates a session entity type
     *
     * @param {string} name
     * The name of the session entity type
     *
     * @param {SessionEntity[]} sessionEntities
     * The session entities. See DialogFlow docs
     *
     * @param {string} u_id
     * An id for identifing the user and his session
     *
     */
    public createSessionEntityType(name: string, sessionEntities: SessionEntity[], u_id: string): void {

        // Delete any existing session entity type
        this.deleteSessionEntityType(name, u_id);

        const sessionPath: any = this.sessionClient.sessionPath(PROJECT_ID, u_id);

        const sessionEntityTypePath: any = this.sessionEntityTypesClient.sessionEntityTypePath(
            PROJECT_ID,
            u_id,
            name,
        );

        // Example at https://github.com/dialogflow/dialogflow-nodejs-client-v2/blob/master/samples/resource.js (l.1092-1102)
        const sessionEntityTypeRequest: any = {
            parent: sessionPath,
            sessionEntityType: {
                name: sessionEntityTypePath,
                entityOverrideMode: 'ENTITY_OVERRIDE_MODE_OVERRIDE',
                entities: sessionEntities,
            },
        };

        this.sessionEntityTypesClient.createSessionEntityType(sessionEntityTypeRequest);

    }

    /**
     * Delete a session entity type
     *
     * @param {string} name
     * The name of the session entity type
     *
     * @param {string} u_id
     * An id for identifing the user and his session
     *
     */
    public deleteSessionEntityType(name: string, u_id: string): void {

        const sessionEntityTypePath: any = this.sessionEntityTypesClient.sessionEntityTypePath(
            PROJECT_ID,
            u_id,
            name,
        );

        const request: any = {
            name: sessionEntityTypePath,
        };

        this.sessionEntityTypesClient.deleteSessionEntityType(request).catch(err => {
            if (err.code === grpc.status.NOT_FOUND) {
                // Do nothing - session entity type did not exist
            } else {
                console.error(`Failed to delete ${name}:`, err);
            }
        });

    }

    /**
     * Log function for debugging reasons - print a session entity type
     * 
     * @param {string} name
     * The name of the session entity type
     *
     * @param {string} u_id
     * An id for identifing the user and his session
     *
     */
    public logSessionEntityType(name: string, u_id: string): void {

        const sessionEntityTypePath: any = this.sessionEntityTypesClient.sessionEntityTypePath(
            PROJECT_ID,
            u_id,
            name,
        );
        
        const request = {
            name: sessionEntityTypePath,
        };
        
        // Send the request for retrieving the sessionEntityType.
        this.sessionEntityTypesClient
            .getSessionEntityType(request)
            .then(responses => {
                console.log('Found session entity type:');
                console.log(
                    `  Name:`,
                    this.sessionEntityTypesClient.matchEntityTypeFromSessionEntityTypeName(responses[0].name)
                );
                console.log(
                    `  Entity override mode: ${responses[0].entityOverrideMode}`
                );
                console.log(`  Entities:`);
                responses[0].entities.forEach(entity => {
                    console.log(`    ${entity.value}: ${entity.synonyms.join(', ')}`);
                });
                console.log('');
            })
            .catch(err => {
                if (err.code === grpc.status.NOT_FOUND) {
                    console.log(`Session entity type ${name} is not found.`);
                } else {
                    console.error(`Failed to get session entity type ${name}:`, err);
                }
            });
        
    }
}
