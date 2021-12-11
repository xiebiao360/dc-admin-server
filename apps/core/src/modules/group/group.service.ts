import { GroupCreateDto, GroupUpdateDto } from '@app/common/dtos/core';
import { GroupEntity } from '@app/common/entities/core';
import { ResultCodeEnum } from '@app/common/enums';
import { CustomException } from '@app/common/exceptions/custom.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  async create(dto: GroupCreateDto) {
    if (!dto) {
      throw new CustomException(
        'group create dto not exist!',
        ResultCodeEnum.ValidateError,
      );
    }
    const count = await this.groupRepository.count({ name: dto.name });
    if (count) {
      throw new CustomException(
        'group create name exists!',
        ResultCodeEnum.ValidateError,
      );
    }
    const entity = this.groupRepository.create(dto);
    await this.groupRepository.save(entity);
  }

  async update(dto: GroupUpdateDto) {
    if (!dto) {
      throw new CustomException(
        'group update dto not exist!',
        ResultCodeEnum.ValidateError,
      );
    }
    const { id, name, description } = dto;
    const count = await this.groupRepository.count({ id });
    if (!count) {
      throw new CustomException(
        'group update record not exist!',
        ResultCodeEnum.ValidateError,
      );
    }
    const entity = this.groupRepository.create({ id });
    if (name) {
      const nameCount = await this.groupRepository.count({ name });
      if (nameCount) {
        throw new CustomException(
          'group update name exist!',
          ResultCodeEnum.ValidateError,
        );
      }
      entity.name = name;
    }
    if (description) {
      entity.description = description;
    }
    await this.groupRepository.save(entity);
  }
}
