import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from '../interfaces/track';
import { ResponseMessages } from 'src/constants/response-messages';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const { name, artistId, albumId, duration } = createTrackDto;

    return await this.prismaService.track.create({
      data: {
        name,
        artistId: artistId || null,
        albumId: albumId || null,
        duration,
      },
    });
  }

  async findAll(): Promise<Track[]> {
    return await this.prismaService.track.findMany();
  }

  async findOne(id: string): Promise<Track> {
    const requestedTrack = await this.prismaService.track.findUnique({
      where: { id },
    });

    if (!requestedTrack) {
      throw new NotFoundException();
    }
    return requestedTrack;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const existingTrack = await this.prismaService.track.findUnique({
      where: { id },
    });

    if (existingTrack) {
      return await this.prismaService.track.update({
        where: { id },
        data: {
          ...updateTrackDto,
        },
      });
    }
    throw new NotFoundException(ResponseMessages.TRACK_NOT_FOUND);
  }

  async remove(id: string) {
    try {
      await this.prismaService.track.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(ResponseMessages.TRACK_NOT_FOUND);
    }
  }
}
