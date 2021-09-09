import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsDate, IsString } from "class-validator";

@Exclude()
export class ReadNewsDto {

    @Expose()
    @IsString()
    readonly _id: string;

    @Expose()
    @IsString()
    readonly title: string;

    @Expose()
    @IsString()
    readonly author: string;

    @Expose()
    @IsString()
    readonly url: string;

    @Expose()
    @IsDate()
    readonly created_at: Date;

    @Expose()
    @IsBoolean()
    readonly active: boolean;
}