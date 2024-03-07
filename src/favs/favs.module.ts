import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { StoreModule } from '../store/store.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [StoreModule]
})
export class FavsModule {}
