import { IsString, Length, IsInt, Min, Max, Matches } from 'class-validator';

export class TextIntentParams {
    @IsString()
    @Length(5, 500)
    readonly textInput: string;
}

export class AudioIntentParams {
    @IsString()
    @Matches(/ios|android/)
    readonly platform: 'ios' | 'android';
}
