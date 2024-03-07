import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { StoreService } from '../store/store.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from '../interfaces/album';
import { ResponseMessages } from 'src/constants/response-messages';

@Injectable()
export class AlbumService {
  constructor(private readonly storeService: StoreService) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    const { name, year, artistId } = createAlbumDto;

    const newAlbum = {
      id: uuidv4(),
      name,
      year,
      artistId: artistId || null
    };

    return this.storeService.createAlbum(newAlbum);
  }

  findAll(): Album[] {
    return this.storeService.getAllAlbums();
  }

  findOne(id: string): Album {
    const requestedAlbum = this.storeService.getAlbumById(id);
    if (!requestedAlbum) {
      throw new NotFoundException();
    }
    return requestedAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const existingAlbum = this.storeService.getAlbumById(id);
  
    if (existingAlbum) {
        const updatedAlbum = {
            ...existingAlbum,
            ...updateAlbumDto,
        }
        return this.storeService.updateAlbum(updatedAlbum);
    }
    throw new NotFoundException(ResponseMessages.ALBUM_NOT_FOUND);
  }

  remove(id: string) {
    const isDeleted = this.storeService.deleteAlbumById(id);

    if (!isDeleted) {
      throw new NotFoundException(ResponseMessages.ALBUM_NOT_FOUND);
    } else {
      this.storeService.setAlbumReferencesToNull(id);
    }
  }
}
