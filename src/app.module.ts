import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StoreService } from './store/store.service';
import { StoreModule } from './store/store.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [UserModule, StoreModule, ArtistModule, AlbumModule, TrackModule],
  controllers: [AppController],
  providers: [AppService, StoreService],
})
export class AppModule {}
