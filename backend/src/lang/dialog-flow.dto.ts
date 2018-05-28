import { IsString, ArrayMinSize, Length, IsInt, Min, Max, Matches } from 'class-validator';

export class SessionEntity {
    @IsString()
    @Length(0, 500)
    value: string;

    @ArrayMinSize(0)
    synonyms: string[];
}