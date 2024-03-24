import { Exclude } from 'class-transformer';

export class UserResponse {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserResponse>) {
    Object.assign(this, partial);
  }
}
