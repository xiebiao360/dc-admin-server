import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { PermissionEntity } from '.';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_role' })
export class RoleEntity extends BaseEntity {
  @Column({ length: 64 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  disabled: boolean;

  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  permissions: PermissionEntity[];
}
