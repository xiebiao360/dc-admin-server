import { dateTransformer } from '@app/common/transformers/date.transformer';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'sys_account' })
export class AccountEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 64, unique: true, nullable: true })
  name?: string;

  @Exclude()
  @Column({ nullable: true })
  password?: string;

  @Column({ type: 'varchar', length: 15, unique: true, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 64, unique: true, nullable: true })
  wechat?: string;

  @Column({
    name: 'last_login_date',
    nullable: true,
    transformer: dateTransformer(),
  })
  lastLoginDate: Date;

  @OneToOne(() => UserEntity, (entity) => entity.account)
  user: UserEntity;
}
