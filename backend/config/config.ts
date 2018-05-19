namespace Config {

    /**
     * The URL to the MongoDB database
     * - "mongodb://localhost/conv-tax" for a local MongoDB client
     * - "mongodb://mongo/conv-tax" for our Docker images
     * @name Config#MONGO_URL
     * @type {string}
     */
    export const MONGO_URL: string = 'mongodb://localhost/conv-tax';

}

export default Config;