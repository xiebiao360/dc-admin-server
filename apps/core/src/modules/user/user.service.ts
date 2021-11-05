import { RegisterByLocalDto } from '@app/common/dtos/core/user/register-by-local.dto';
import { AccountEntity } from '@app/common/entities/core/account.entity';
import { UserEntity } from '@app/common/entities/core/user.entity';
import { GenderEnum } from '@app/common/enums/gender.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async registerByLocal(manager: EntityManager, dto: RegisterByLocalDto) {
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
    await manager.save(userEntity);
    return true;
  }

  findAll() {
    return this.userRepository.find({ relations: ['account'] });
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }
}
