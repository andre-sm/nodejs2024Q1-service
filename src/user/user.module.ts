import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { StoreModule } from '../store/store.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [StoreModule, PrismaModule],
})
export class UserModule {}
