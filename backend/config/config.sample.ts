/* tslint:disable */

namespace Config {

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