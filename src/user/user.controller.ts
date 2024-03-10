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
  create(@Body() createUserDto: CreateUserDto): UserResponse {
    const createdUser = this.userService.create(createUserDto);
    return new UserResponse(createdUser);
  }

  @Get()
  findAll(): UserResponse[] {
    const allUsers = this.userService.findAll();
    return allUsers.map((user) => new UserResponse(user));
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): UserResponse {
    const requestedUser = this.userService.findOne(id);
    return new UserResponse(requestedUser);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserResponse {
    const updatedUser = this.userService.updateUserPassword(
      id,
      updatePasswordDto,
    );

    return new UserResponse(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    this.userService.remove(id);
  }
}
