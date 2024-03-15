import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponse } from './entities/user-response.entity';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    const createdUser = await this.userService.create(createUserDto);
    return new UserResponse(createdUser);
  }

  @Get()
  async findAll(): Promise<UserResponse[]> {
    const allUsers = await this.userService.findAll();
    return allUsers.map((user) => new UserResponse(user));
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserResponse> {
    const requestedUser = await this.userService.findOne(id);
    return new UserResponse(requestedUser);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserResponse> {
    const updatedUser = await this.userService.updateUserPassword(
      id,
      updatePasswordDto,
    );

    return new UserResponse(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.remove(id);
  }
}
