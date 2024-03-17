import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from '../interfaces/artist';
import { ResponseMessages } from 'src/constants/response-messages';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const { name, grammy } = createArtistDto;

    return await this.prismaService.artist.create({
      data: {
        name,
        grammy,
      },
    });
  }

  async findAll(): Promise<Artist[]> {
    return await this.prismaService.artist.findMany();
  }

  async findOne(id: string): Promise<Artist> {
    const requestedArtist = await this.prismaService.artist.findUnique({
      where: { id },
    });

    if (!requestedArtist) {
      throw new NotFoundException();
    }
    return requestedArtist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const existingArtist = await this.prismaService.artist.findUnique({
      where: { id },
    });

    if (existingArtist) {
      return await this.prismaService.artist.update({
        where: { id },
        data: {
          ...updateArtistDto,
        },
      });
    }

    throw new NotFoundException(ResponseMessages.ARTIST_NOT_FOUND);
  }

  async remove(id: string) {
    try {
      await this.prismaService.artist.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(ResponseMessages.ARTIST_NOT_FOUND);
    }
  }
}
