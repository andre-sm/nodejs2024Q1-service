import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { StoreModule } from '../store/store.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [StoreModule]
})
export class AlbumModule {}
