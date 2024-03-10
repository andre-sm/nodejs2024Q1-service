import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { StoreService } from '../store/store.service';
import { FavoritesResponse } from '../interfaces/favs';
import { ResponseMessages } from 'src/constants/response-messages';

@Injectable()
export class FavsService {
  constructor(private readonly storeService: StoreService) {}

  findAll(): FavoritesResponse {
    return this.storeService.getAllFavs();
  }

  addTrackToFav(id: string) {
    const trackToAdd = this.storeService.getTrackById(id);
    if (!trackToAdd) {
      throw new UnprocessableEntityException();
    }

    return this.storeService.addTrackToFav(id);
  }

  removeFavTrack(id: string) {
    const isDeleted = this.storeService.deleteFavTrack(id);

    if (!isDeleted) {
      throw new NotFoundException(ResponseMessages.FAV_TRACK_NOT_FOUND);
    }
  }

  addAlbumToFav(id: string) {
    const albumToAdd = this.storeService.getAlbumById(id);
    if (!albumToAdd) {
      throw new UnprocessableEntityException();
    }

    return this.storeService.addAlbumToFav(id);
  }

  removeFavAlbum(id: string) {
    const isDeleted = this.storeService.deleteFavAlbum(id);

    if (!isDeleted) {
      throw new NotFoundException(ResponseMessages.FAV_ALBUM_NOT_FOUND);
    }
  }

  addArtistToFav(id: string) {
    const artistToAdd = this.storeService.getArtistById(id);
    if (!artistToAdd) {
      throw new UnprocessableEntityException();
    }

    return this.storeService.addArtistToFav(id);
  }

  removeFavArtist(id: string) {
    const isDeleted = this.storeService.deleteFavArtist(id);

    if (!isDeleted) {
      throw new NotFoundException(ResponseMessages.FAV_ARTIST_NOT_FOUND);
    }
  }
}
