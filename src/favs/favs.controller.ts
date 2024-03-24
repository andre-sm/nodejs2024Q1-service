import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async findAll() {
    return await this.favsService.findAll();
  }

  @Post('track/:id')
  async addTrackToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.addTrackToFav(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  async removeFavTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.removeFavTrack(id);
  }

  @Post('album/:id')
  async addAlbumToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.addAlbumToFav(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  async removeFavAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.removeFavAlbum(id);
  }

  @Post('artist/:id')
  async addArtistToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.addArtistToFav(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async removeFavArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.favsService.removeFavArtist(id);
  }
}
