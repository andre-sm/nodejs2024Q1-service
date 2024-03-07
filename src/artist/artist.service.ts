import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { StoreService } from '../store/store.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from '../interfaces/artist';
import { ResponseMessages } from 'src/constants/response-messages';

@Injectable()
export class ArtistService {
  constructor(private readonly storeService: StoreService) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const { name, grammy } = createArtistDto;

    const newArtist = {
      id: uuidv4(),
      name,
      grammy
    };

    return this.storeService.createArtist(newArtist);
  }

  findAll() {
    return this.storeService.getAllArtists();
  }

  findOne(id: string): Artist {
    const requestedArtist = this.storeService.getArtistById(id);
    if (!requestedArtist) {
      throw new NotFoundException();
    }
    return requestedArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const existingArtist = this.storeService.getArtistById(id);
  
    if (existingArtist) {
        const updatedArtist = {
            ...existingArtist,
            ...updateArtistDto
        }
        return this.storeService.updateArtist(updatedArtist);
    }
    throw new NotFoundException(ResponseMessages.ARTIST_NOT_FOUND);
  }

  remove(id: string) {
    const isDeleted = this.storeService.deleteArtistById(id);

    if (!isDeleted) {
      throw new NotFoundException(ResponseMessages.ARTIST_NOT_FOUND);
    }
    
    this.storeService.setArtistReferencesToNull(id);
    this.storeService.deleteFromFav('artists', id);
  }
}
