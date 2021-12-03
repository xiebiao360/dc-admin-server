import { CreateByLocalDto } from '@app/common/dtos/core/user/create-by-local.dto';
import { UserEntity } from '@app/common/entities/core/user.entity';
import { UserServiceProxy } from '@app/service-proxy';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserServiceProxy,
    private readonly jwtService: JwtService,
  ) {}
  registerByLocal(dto: CreateByLocalDto) {
    return this.userService.createByLocal(dto);
  }

  async validateUser(account: string, password: string) {
    const entityObs = await this.userService.findByAccountAndPassword({
      account,
      password,
    });
    return entityObs;
  }

  async login(user: UserEntity) {
    const payload = { id: user.id, username: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
