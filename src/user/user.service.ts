import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { StoreService } from 'src/store/store.service';
import { User } from 'src/interfaces/user';

@Injectable()
export class UserService {
  constructor(private readonly storeService: StoreService) {}

  create(createUserDto: CreateUserDto): User {
    const { login, password } = createUserDto;
    const timestamp = Date.now();

    const newUserData = {
      login,
      password,
      id: uuidv4(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    return this.storeService.createUser(newUserData);
  }

  findAll(): User[] {
    return this.storeService.getAllUsers();
  }

  findOne(id: string) {
    return this.storeService.getUserById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
