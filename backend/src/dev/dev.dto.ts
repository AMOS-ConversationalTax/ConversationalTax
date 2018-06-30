import { IsString, Length } from 'class-validator';

/**
 * A class wrapping the params of a text query to the lang controller
 */
export class UserIdParam {
    /**
     * A string containing the u_id of the user who started the query
     * @type {string}
     */
    @IsString()
    @Length(0, 200)
    readonly u_id: string;
}
