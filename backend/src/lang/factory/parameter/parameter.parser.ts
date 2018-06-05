export class ParameterHelper {

    public static extractData(data: object, pathToParameter: Array<string>){
        return this.helper(data, pathToParameter);
    }

    private static helper(source: object, parameterPath: Array<string>) {
            return parameterPath.reduce((current: object, nextProp: string) => {
                if (typeof current === 'object' && current[nextProp] !== undefined) {
                    return current[nextProp];
                }
            }, source);
    }
}