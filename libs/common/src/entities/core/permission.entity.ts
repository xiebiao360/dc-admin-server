import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sys_permission' })
export class PermissionEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column()
  name: string;

  @Column()
  key: string;

  @ManyToOne(() => PermissionEntity, (permission) => permission.children)
  parent: PermissionEntity;

  @OneToMany(() => PermissionEntity, (permission) => permission.parent)
  children: PermissionEntity[];
}
