/* tslint:disable:completed-docs */

/**
 * Class to handle a specific Intent
 */
export abstract class IntentHandler{

    protected FIELDS = 'fields';
    protected STRINGVALUE = 'stringValue';
    protected STRUCTVALUE = 'structValue';

    /**
     * Proccesses a given DialogFlow Reponse
     * @param {IIntentData} intentData Parts of the DialogFlow response
     * @returns {Promise<ReturnText | undefined>} The text for the user or undefined.
     */
    public async abstract handle(intentData: IIntentData): Promise<ReturnText | undefined>;

    /**
     * Used to extract custom and normal entities from the parameter response of Dialogflow
     * @param {object} data Json of all parameter given by the Dialogflow response
     * @param {string} parameterName The name of the parameter which should be extracted
     * @param {string} parameterType The type of the parameter which should be extracted
     * @returns {any} The extracted parameter as string or Date
     */
    protected extractData(data: object, parameterName: string, parameterType: string): any {
        const reducedParameter = this.reducer(data, this.getParameterPath(parameterName));
        if (reducedParameter !== null) {
            return reducedParameter;
        }
        return this.reducer(data, this.getCustomParameterPath(parameterName, parameterType));
    }

    /**
     * Creates a path for normal entity parameter
     * @param {string} parameterName The name of the searched parameter
     * @returns {Array<sting>} The path to the searched parameter
     */
    private getParameterPath(parameterName: string): Array<string> {
        return [this.FIELDS, parameterName, this.STRINGVALUE];
    }

    /**
     * Create a path for a custom entity parameter
     * @param {string} parameterName The name of the searched parameter
     * @param {string} parameterType The type of the searched parameter
     * @returns {Array<sting>} The path to the searched parameter
     */
    private getCustomParameterPath(parameterName: string, parameterType: string): string[] {
        return [this.FIELDS, parameterName, this.STRUCTVALUE, this.FIELDS, parameterType, this.STRINGVALUE];
    }

    /**
     * Reduces a given path to the searched parameter
     * @param {object} source Json of all parameter given by the Dialogflow response
     * @param {Array<string>} parameterPath The path to the needed parameter
     * @returns {string} The parameter at the end of the given path
     */
    private reducer(source: object, parameterPath: Array<string>): string {
        return parameterPath.reduce((current: object, nextProp: string) => {
            if (typeof current === 'object' && current[nextProp] !== undefined) {
                return current[nextProp];
            }
        }, source);
    }

}