import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { StoreModule } from '../store/store.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [StoreModule]
})
export class TrackModule {}
