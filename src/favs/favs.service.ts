import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesResponse, FavoriteEntity } from '../interfaces/favs';
import { ResponseMessages } from 'src/constants/response-messages';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<FavoritesResponse> {
    const favoritesRequests = [
      this.prismaService.favoriteArtist.findMany({
        include: {
          artist: true,
        },
      }),
      this.prismaService.favoriteAlbum.findMany({
        include: {
          album: true,
        },
      }),
      this.prismaService.favoriteTrack.findMany({
        include: {
          track: true,
        },
      }),
    ];

    const favorites = await Promise.all(favoritesRequests);

    return {
      artists: favorites[0].map(
        (favoriteArtist: FavoriteEntity) => favoriteArtist.artist,
      ),
      albums: favorites[1].map(
        (favoriteAlbum: FavoriteEntity) => favoriteAlbum.album,
      ),
      tracks: favorites[2].map(
        (favoriteTrack: FavoriteEntity) => favoriteTrack.track,
      ),
    };
  }

  async addTrackToFav(id: string) {
    const trackToAdd = await this.prismaService.track.findUnique({
      where: { id },
    });

    if (!trackToAdd) {
      throw new UnprocessableEntityException();
    }

    return await this.prismaService.favoriteTrack.create({
      data: {
        trackId: id,
      },
    });
  }

  async removeFavTrack(id: string) {
    try {
      await this.prismaService.favoriteTrack.delete({
        where: {
          trackId: id,
        },
      });
    } catch (error) {
      throw new NotFoundException(ResponseMessages.FAV_TRACK_NOT_FOUND);
    }
  }

  async addAlbumToFav(id: string) {
    const albumToAdd = await this.prismaService.album.findUnique({
      where: { id },
    });

    if (!albumToAdd) {
      throw new UnprocessableEntityException();
    }

    return await this.prismaService.favoriteAlbum.create({
      data: {
        albumId: id,
      },
    });
  }

  async removeFavAlbum(id: string) {
    try {
      await this.prismaService.favoriteAlbum.delete({
        where: {
          albumId: id,
        },
      });
    } catch (error) {
      throw new NotFoundException(ResponseMessages.FAV_ALBUM_NOT_FOUND);
    }
  }

  async addArtistToFav(id: string) {
    const artistToAdd = await this.prismaService.artist.findUnique({
      where: { id },
    });

    if (!artistToAdd) {
      throw new UnprocessableEntityException();
    }

    return await this.prismaService.favoriteArtist.create({
      data: {
        artistId: id,
      },
    });
  }

  async removeFavArtist(id: string) {
    try {
      await this.prismaService.favoriteArtist.delete({
        where: {
          artistId: id,
        },
      });
    } catch (error) {
      throw new NotFoundException(ResponseMessages.FAV_ARTIST_NOT_FOUND);
    }
  }
}
