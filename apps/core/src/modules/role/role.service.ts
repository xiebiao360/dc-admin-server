import { RoleCreateDto } from '@app/common/dtos/core';
import { RoleUpdateDto } from '@app/common/dtos/core/role/role-update.dto';
import { RoleEntity } from '@app/common/entities/core';
import { ResultCodeEnum } from '@app/common/enums';
import { CustomException } from '@app/common/exceptions/custom.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async find() {
    return await this.roleRepository.find();
  }

  async create(dto: RoleCreateDto) {
    if (!dto) {
      throw new CustomException(
        'role create dto not exist!',
        ResultCodeEnum.ValidateError,
      );
    }
    const count = await this.roleRepository.count({ name: dto.name });
    if (count) {
      throw new CustomException(
        'role create name exists!',
        ResultCodeEnum.ValidateError,
      );
    }
    const entity = this.roleRepository.create(dto);
    await this.roleRepository.save(entity);
  }

  async update(dto: RoleUpdateDto) {
    if (!dto) {
      throw new CustomException(
        'role update dto not exist!',
        ResultCodeEnum.ValidateError,
      );
    }
    const { id, name, description } = dto;
    const count = await this.roleRepository.count({ id });
    if (!count) {
      throw new CustomException(
        'role update record not exist!',
        ResultCodeEnum.ValidateError,
      );
    }
    const entity = this.roleRepository.create({ id });
    if (name) {
      const nameCount = await this.roleRepository.count({ name });
      if (nameCount) {
        throw new CustomException(
          'role update name exist!',
          ResultCodeEnum.ValidateError,
        );
      }
      entity.name = name;
    }
    if (description) {
      entity.description = description;
    }
    await this.roleRepository.save(entity);
  }
}
