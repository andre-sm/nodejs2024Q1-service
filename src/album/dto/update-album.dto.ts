import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  artistId: string;
}
