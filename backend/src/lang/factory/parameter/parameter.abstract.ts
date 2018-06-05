export abstract class ParameterHandler{

    protected FIELDS = 'fields';
    protected STRINGVALUE = 'stringValue';
    protected STRUCTVALUE = 'structValue';

    public abstract handle(parameterData: IParameterData);

    public getParameterPath(parameterName: string): Array<string>{
        return [this.FIELDS, parameterName, this.STRINGVALUE];
    }

    public getCustomParameterPath(parameterName: string, parameterType: string): Array<string>{
        return [this.FIELDS, parameterName, this.STRUCTVALUE, this.FIELDS, parameterType, this.STRINGVALUE];
    }

}