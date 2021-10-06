import DateTransformer from '@app/common/transformers/Date.transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'sys_account' })
export class AccountEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 15, unique: true, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 60, unique: true, nullable: true })
  wechat: string;

  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @Column({
    name: 'last_login_date',
    nullable: true,
    transformer: DateTransformer,
  })
  lastLoginDate: Date;

  @OneToOne(() => UserEntity, (entity) => entity.account, { cascade: true })
  user: UserEntity;
}
