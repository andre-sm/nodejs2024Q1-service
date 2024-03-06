import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAlbumDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsBoolean()
    year: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    artistId: string;
}
