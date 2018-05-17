import { IsString, Length } from 'class-validator';

export class CreatePostDto {
    @IsString()
    @Length(5, 50)
    readonly title: string;

    @IsString()
    readonly content?: string;

    @IsString()
    readonly userId: string;
}