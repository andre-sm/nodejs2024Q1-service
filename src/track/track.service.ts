import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { StoreService } from '../store/store.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from '../interfaces/track';
import { ResponseMessages } from 'src/constants/response-messages';

@Injectable()
export class TrackService {
  constructor(private readonly storeService: StoreService) {}

  create(createTrackDto: CreateTrackDto): Track {
    const { name, artistId, albumId, duration } = createTrackDto;

    const newTrack = {
      id: uuidv4(),
      name,
      artistId: artistId || null,
      albumId: albumId || null,
      duration,
    };

    return this.storeService.createTrack(newTrack);
  }

  findAll(): Track[] {
    return this.storeService.getAllTracks();
  }

  findOne(id: string): Track {
    const requestedTrack = this.storeService.getTrackById(id);
    if (!requestedTrack) {
      throw new NotFoundException();
    }
    return requestedTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const existingTrack = this.storeService.getTrackById(id);

    if (existingTrack) {
      const updatedTrack = {
        ...existingTrack,
        ...updateTrackDto,
      };
      return this.storeService.updateTrack(updatedTrack);
    }
    throw new NotFoundException(ResponseMessages.TRACK_NOT_FOUND);
  }

  remove(id: string) {
    const isDeleted = this.storeService.deleteTrackById(id);

    if (!isDeleted) {
      throw new NotFoundException(ResponseMessages.TRACK_NOT_FOUND);
    }

    this.storeService.deleteFromFav('tracks', id);
  }
}
