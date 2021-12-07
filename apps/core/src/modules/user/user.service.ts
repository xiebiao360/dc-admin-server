import { CreateByLocalDto } from '@app/common/dtos/core';
import { AccountEntity, UserEntity } from '@app/common/entities/core';
import { GenderEnum } from '@app/common/enums/gender.enum';
import { ValidateException } from '@app/common/exceptions/validate.exception';
import { CheckUtil } from '@app/common/utils/check.util';
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

  async createByLocal(manager: EntityManager, dto: CreateByLocalDto) {
    const account = await manager.find(AccountEntity, {
      where: { name: dto.account },
    });
    if (!CheckUtil.isNull(account) && account.length > 0) {
      throw new ValidateException('账号已存在');
    }

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
  }

  findAll() {
    return this.userRepository.find({ relations: ['account'] });
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  findByAccountAndPassword(account: string, password: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.account', 'account')
      .where('account.name = :account', { account })
      .andWhere('account.password = :password', { password })
      .getOne();
  }
}
