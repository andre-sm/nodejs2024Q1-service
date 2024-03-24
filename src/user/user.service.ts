import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from '../interfaces/user';
import { ResponseMessages } from '../constants/response-messages';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { login, password } = createUserDto;

    const newUser = await this.prismaService.user.create({
      data: {
        login,
        password,
      },
    });

    return {
      ...newUser,
      createdAt: newUser.createdAt.getTime(),
      updatedAt: newUser.updatedAt.getTime(),
    };
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.prismaService.user.findMany();

    return allUsers.map((user) => {
      return {
        ...user,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      };
    });
  }

  async findOne(id: string): Promise<User> {
    const requestedUser = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!requestedUser) {
      throw new NotFoundException();
    }
    return {
      ...requestedUser,
      createdAt: requestedUser.createdAt.getTime(),
      updatedAt: requestedUser.updatedAt.getTime(),
    };
  }

  async updateUserPassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (existingUser) {
      const { oldPassword, newPassword } = updatePasswordDto;

      if (oldPassword !== existingUser.password) {
        throw new ForbiddenException(ResponseMessages.WRONG_PASSWORD);
      }

      const updatedUser = await this.prismaService.user.update({
        where: { id },
        data: {
          password: newPassword,
          version: {
            increment: 1,
          },
        },
      });

      return {
        ...updatedUser,
        createdAt: updatedUser.createdAt.getTime(),
        updatedAt: updatedUser.updatedAt.getTime(),
      };
    }
    throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
  }

  async remove(id: string) {
    try {
      await this.prismaService.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(ResponseMessages.USER_NOT_FOUND);
    }
  }
}
