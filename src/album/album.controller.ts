import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ParseUUIDPipe } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @UsePipes(new ParseUUIDPipe({ version: '4' }))
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ParseUUIDPipe({ version: '4' }))
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @UsePipes(new ParseUUIDPipe({ version: '4' }))
  remove(@Param('id') id: string) {
    return this.albumService.remove(id);
  }
}
