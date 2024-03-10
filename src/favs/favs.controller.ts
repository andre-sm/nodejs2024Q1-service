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
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  addTrackToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addTrackToFav(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeFavTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeFavTrack(id);
  }

  @Post('album/:id')
  addAlbumToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addAlbumToFav(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeFavAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeFavAlbum(id);
  }

  @Post('artist/:id')
  addArtistToFav(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addArtistToFav(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeFavArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeFavArtist(id);
  }
}
