import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { StoreService } from '../store/store.service';
import { User } from '../interfaces/user';
import { ResponseMessages } from '../constants/response-messages';

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

  findOne(id: string): User {
    const requestedUser = this.storeService.getUserById(id);
    if (!requestedUser) {
      throw new NotFoundException();
    }
    return requestedUser;
  }

  updateUserPassword(id: string, updatePasswordDto: UpdatePasswordDto): User {
    const existingUser = this.storeService.getUserById(id);
  
    if (existingUser) {
        const { oldPassword, newPassword } = updatePasswordDto;

        if (oldPassword !== existingUser.password) {
          throw new ForbiddenException(ResponseMessages.WRONG_PASSWORD);
        }

        const updatedUser = {
            ...existingUser,
            password: newPassword,
            version: ++existingUser.version,
            updatedAt: Date.now()
        }
        return this.storeService.updateUserPassword(updatedUser);
    }
    throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
  }

  remove(id: string) {
    const isDeleted = this.storeService.deleteUserById(id);

    if (!isDeleted) {
      throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
    }
  }
}
