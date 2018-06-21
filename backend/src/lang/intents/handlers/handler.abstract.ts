export abstract class IntentHandler{

    protected FIELDS = 'fields';
    protected STRINGVALUE = 'stringValue';
    protected STRUCTVALUE = 'structValue';

    public async abstract handle(intentData: IIntentData): Promise<ReturnText | undefined>;

    private getParameterPath(parameterName: string): Array<string>{
        return [this.FIELDS, parameterName, this.STRINGVALUE];
    }

    private getCustomParameterPath(parameterName: string, parameterType: string): Array<string>{
        return [this.FIELDS, parameterName, this.STRUCTVALUE, this.FIELDS, parameterType, this.STRINGVALUE];
    }

    public extractData(data: object, parameterName: string, parameterType: string){
        const reducedParameter = this.reducer(data, this.getParameterPath(parameterName));
        if (reducedParameter !== null ) {
            return reducedParameter;
        }
        return this.reducer(data, this.getCustomParameterPath(parameterName, parameterType));
    }

    private reducer(source: object, parameterPath: Array<string>) {
            return parameterPath.reduce((current: object, nextProp: string) => {
                if (typeof current === 'object' && current[nextProp] !== undefined) {
                    return current[nextProp];
                }
            }, source);
    }

}