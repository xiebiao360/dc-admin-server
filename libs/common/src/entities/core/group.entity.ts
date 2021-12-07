import { Column, JoinTable, ManyToMany } from 'typeorm';
import { UserEntity } from '.';
import { BaseEntity } from '../base.entity';
import { RoleEntity } from './role.entity';

export class GroupEntity extends BaseEntity {
  @Column({ length: 64 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  disabled: boolean;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  users: UserEntity[];

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];
}
