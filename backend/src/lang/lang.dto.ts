import { IsString, Length, Matches } from 'class-validator';

export class TextIntentBody {
    @IsString()
    @Length(5, 500)
    readonly textInput: string;
}

export class TextIntentParams {
    @IsString()
    @Length(0, 200)
    readonly u_id: string;
}

export class AudioIntentParams {
    @IsString()
    @Matches(/ios|android/)
    readonly platform: 'ios' | 'android';

    @IsString()
    @Length(0, 200)
    readonly u_id: string;
}
