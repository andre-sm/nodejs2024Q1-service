import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ParseUUIDPipe, HttpCode } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from '../interfaces/track';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @UsePipes(new ParseUUIDPipe({ version: '4' }))
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ParseUUIDPipe({ version: '4' }))
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @UsePipes(new ParseUUIDPipe({ version: '4' }))
  remove(@Param('id') id: string) {
    return this.trackService.remove(id);
  }
}
