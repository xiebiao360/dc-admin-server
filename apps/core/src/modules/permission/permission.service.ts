import { PermissionCreateDto } from '@app/common/dtos/core/permission/permission-create.dto';
import { PermissionEntity } from '@app/common/entities/core';
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
      return Promise.reject('permission create dto is null!');
    }
    if (dto.parentId) {
      const { name, key, description, parentId } = dto;
      const parent = await this.permissionRepository.findOne(parentId);
      const entity = this.permissionRepository.create({
        name,
        key,
        description,
        parent,
      });
      this.permissionRepository.save(entity);
      return Promise.resolve();
    }
    const { name, key, description } = dto;
    const entity = this.permissionRepository.create({
      name,
      key,
      description,
    });
    this.permissionRepository.save(entity);
  }
}
