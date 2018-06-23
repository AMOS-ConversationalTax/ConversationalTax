import { IsString, Length, Matches } from 'class-validator';

/**
 * A class wrapping the body of a text query to the lang controller
 */
export class TextIntentBody {
    /**
     * A string containing the text input that is sent to the lang controller
     * @type {string}
     */
    @IsString()
    @Length(5, 500)
    readonly textInput: string;
}

/**
 * A class wrapping the params of a text query to the lang controller
 */
export class TextIntentParams {
    /**
     * A string containing the u_id of the user who started the query
     * @type {string}
     */
    @IsString()
    @Length(0, 200)
    readonly u_id: string;
}

/**
 * A class wrapping the params of a audio file query to the lang controller
 */
export class AudioIntentParams {
    /**
     * A string containing the platform the user uses
     * Only ios or android are allowed
     * @type {string}
     */
    @IsString()
    @Matches(/ios|android/)
    readonly platform: 'ios' | 'android';

    /**
     * A string containing the u_id of the user who started the query
     * @type {string}
     */
    @IsString()
    @Length(0, 200)
    readonly u_id: string;
}
