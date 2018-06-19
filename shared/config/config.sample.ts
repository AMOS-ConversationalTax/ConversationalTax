/* tslint:disable */

namespace Config {
    /**
    * URL to the Backend Server - Will be replaced automatically by the CD 
    */
    export const SERVER_URL = 'http://localhost:3000';

    /**
    * URL to the websocket - Will be replaced automatically by the CD 
    */
    export const WEBSOCKET_URL = 'ws://localhost:3001';

    /*
    * Relevant for our CD system. Integrates the build date into the frontend.
    */
    export const BUILD_DATE = 'WillBeReplacedAutomatically';

    /**
     * The URL to the MongoDB database
     * - "mongodb://localhost/conv-tax" for a local MongoDB client
     * - "mongodb://mongo/conv-tax" for our Docker images
     * @name Config#MONGO_URL
     * @type {string}
     */
    export const MONGO_URL = 'mongodb://localhost/conv-tax';

    /**
     * The keyfile for dialogflow. You should copy & past the whole keyfile here.
     */
    export const DIALOGFLOW_KEY = {
        "type": "",
        "project_id": "",
        "private_key_id": "",
        "private_key": "",
        "client_email": "",
        "client_id": "",
        "auth_uri": "",
        "token_uri": "",
        "auth_provider_x509_cert_url": "",
        "client_x509_cert_url": "",
    };

}

export default Config;