import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateAlbumDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsBoolean()
    year: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    artistId: string;
}
