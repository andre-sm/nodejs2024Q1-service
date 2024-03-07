import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTrackDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    artistId: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    albumId: string;

    @IsNotEmpty()
    @IsInt()
    duration: number;
}