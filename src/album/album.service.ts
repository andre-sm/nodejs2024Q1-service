import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from '../interfaces/album';
import { ResponseMessages } from 'src/constants/response-messages';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const { name, year, artistId } = createAlbumDto;

    return await this.prismaService.album.create({
      data: {
        name,
        year,
        artistId: artistId || null,
      },
    });
  }

  async findAll(): Promise<Album[]> {
    return await this.prismaService.album.findMany();
  }

  async findOne(id: string): Promise<Album> {
    const requestedAlbum = await this.prismaService.album.findUnique({
      where: { id },
    });

    if (!requestedAlbum) {
      throw new NotFoundException();
    }
    return requestedAlbum;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const existingAlbum = await this.prismaService.album.findUnique({
      where: { id },
    });

    if (existingAlbum) {
      return await this.prismaService.album.update({
        where: { id },
        data: {
          ...updateAlbumDto,
        },
      });
    }
    throw new NotFoundException(ResponseMessages.ALBUM_NOT_FOUND);
  }

  async remove(id: string) {
    try {
      await this.prismaService.album.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(ResponseMessages.ALBUM_NOT_FOUND);
    }
  }
}
