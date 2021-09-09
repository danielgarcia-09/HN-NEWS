import { IsNotEmpty } from "class-validator";

export class CreateNewsDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    created_at: Date;

    @IsNotEmpty()
    active: boolean;
}