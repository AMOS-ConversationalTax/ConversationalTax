/* tslint:disable:completed-docs */
// TODO Alex has to add the JSDoc

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

    // TODO return type definition
    protected extractData(data: object, parameterName: string, parameterType: string) {
        const reducedParameter = this.reducer(data, this.getParameterPath(parameterName));
        if (reducedParameter !== null) {
            return reducedParameter;
        }
        return this.reducer(data, this.getCustomParameterPath(parameterName, parameterType));
    }

    private getParameterPath(parameterName: string): string[] {
        return [this.FIELDS, parameterName, this.STRINGVALUE];
    }

    private getCustomParameterPath(parameterName: string, parameterType: string): string[] {
        return [this.FIELDS, parameterName, this.STRUCTVALUE, this.FIELDS, parameterType, this.STRINGVALUE];
    }

    // TODO return type definition
    private reducer(source: object, parameterPath: Array<string>) {
        return parameterPath.reduce((current: object, nextProp: string) => {
            if (typeof current === 'object' && current[nextProp] !== undefined) {
                return current[nextProp];
            }
        }, source);
    }

}