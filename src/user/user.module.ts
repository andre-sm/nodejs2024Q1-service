import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { StoreModule } from 'src/store/store.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [StoreModule]
})
export class UserModule {}
