import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity({ name: 'sys_permission' })
export class PermissionEntity extends BaseEntity {
  @Column({ length: 64 })
  name: string;

  @Column({ length: 32 })
  key: string;

  @Column({ length: 255 })
  description: string;

  @ManyToOne(() => PermissionEntity, (permission) => permission.children)
  parent: PermissionEntity;

  @OneToMany(() => PermissionEntity, (permission) => permission.parent)
  children: PermissionEntity[];
}
