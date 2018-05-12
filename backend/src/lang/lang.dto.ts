import { IsString, Length, IsInt, Min, Max } from 'class-validator';

export class TextIntentParams {
    @IsString()
    @Length(5, 500)
    readonly textInput: string;
}

export class AudioIntentParams {
    @IsString()
    @Length(3, 100)
    readonly encoding: string;

    @IsInt()
    @Min(0)
    @Max(100000)
    readonly sampleRate: number;

    @IsString()
    @Length(100, 100000) // TODO how long is a base64 audio file?
    readonly inputAudio: string;
}
