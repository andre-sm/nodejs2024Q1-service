import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { StoreModule } from '../store/store.module';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService],
  imports: [StoreModule],
})
export class ArtistModule {}
