import { AccountEntity } from '@app/common/entities/core/account.entity';
import { UserEntity } from '@app/common/entities/core/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  getHello(name: string) {
    console.log('hello world xiebiao!');
    return `hello world ${name}!`;
  }
  list() {
    return this.userRepository.find();
  }
}
