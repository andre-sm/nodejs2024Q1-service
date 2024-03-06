import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from '../interfaces/artist';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto): Artist {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @UsePipes(new ParseUUIDPipe({ version: '4' }))
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ParseUUIDPipe({ version: '4' }))
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ParseUUIDPipe({ version: '4' }))
  remove(@Param('id') id: string) {
    return this.artistService.remove(id);
  }
}
