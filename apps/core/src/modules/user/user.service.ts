import { CreateUserByLocalDto } from '@app/common/dtos/core/create-user-by-local.dto';
import { AccountEntity } from '@app/common/entities/core/account.entity';
import { UserEntity } from '@app/common/entities/core/user.entity';
import { GenderEnum } from '@app/common/enums/gender.enum';
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

  createByLocal(dto: CreateUserByLocalDto) {
    // 创建账号
    const accountEntity = new AccountEntity();
    accountEntity.name = dto.account;
    accountEntity.password = dto.password;

    // 创建用户
    const userEntity = new UserEntity();
    userEntity.name = dto.userName || dto.account;
    userEntity.gender = dto.gender || GenderEnum.unknow;
    userEntity.birthday = dto.birthday;
    userEntity.account = accountEntity;
    return this.userRepository.save(userEntity);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }
}
