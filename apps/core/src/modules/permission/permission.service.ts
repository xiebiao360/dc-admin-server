import {
  PermissionCreateDto,
  PermissionUpdateDto,
} from '@app/common/dtos/core';
import { PermissionEntity } from '@app/common/entities/core';
import { ResultCodeEnum } from '@app/common/enums/result-code.enum';
import { CustomException } from '@app/common/exceptions/custom.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async find(parent?: number) {
    if (parent) {
      const parentRow = await this.permissionRepository.findOne({
        relations: ['children'],
        where: { id: parent },
      });
      return parentRow.children;
    }
    return await this.permissionRepository.find({
      relations: ['parent'],
      where: { parent: null },
    });
  }

  async create(dto: PermissionCreateDto) {
    if (!dto) {
      throw new CustomException(
        'permission create dto is not exist!',
        ResultCodeEnum.ValidateError,
      );
    }
    const { name, key, description, parentId } = dto;
    const entity = this.permissionRepository.create({
      name,
      key,
      description,
    });
    if (parentId) {
      const parent = await this.permissionRepository.findOne(parentId);
      entity.parent = parent;
    }
    await this.permissionRepository.save(entity);
  }

  async delete(ids: number[]) {
    // todo 从角色中移除权限
    // 删除权限
    await this.permissionRepository.delete(ids);
  }

  async update(dto: PermissionUpdateDto) {
    if (!dto) {
      throw new CustomException(
        'permission update dto is not exist!',
        ResultCodeEnum.ValidateError,
      );
    }
    const { id, name, key, description, parentId } = dto;
    const count = await this.permissionRepository.count({ id });
    if (!count) {
      throw new CustomException(
        'permission update record is not exist!',
        ResultCodeEnum.ValidateError,
      );
    }
    const entity = this.permissionRepository.create({ id });
    if (name) {
      const nameCount = await this.permissionRepository.count({ name });
      if (nameCount) {
        throw new CustomException(
          'permission update name exist!',
          ResultCodeEnum.ValidateError,
        );
      }
      entity.name = name;
    }
    if (key) {
      const keyCount = await this.permissionRepository.count({ key });
      if (keyCount) {
        throw new CustomException(
          'permission update key exist!',
          ResultCodeEnum.ValidateError,
        );
      }
      entity.key = key;
    }
    if (description) {
      entity.description;
    }
    if (parentId) {
      const parent = await this.permissionRepository.findOne(parentId);
      if (!parent) {
        throw new CustomException(
          'permission update parent is not exist!',
          ResultCodeEnum.ValidateError,
        );
      }
      entity.parent = parent;
    }
    await this.permissionRepository.save(entity);
  }
}
