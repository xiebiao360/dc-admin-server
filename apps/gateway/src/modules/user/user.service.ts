import { UserEntity } from '@app/common/entities/core';
import { UserServiceProxy } from '@app/service-proxy';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userService: UserServiceProxy) {}

  async findAll() {
    return [new UserEntity()];
  }
}
