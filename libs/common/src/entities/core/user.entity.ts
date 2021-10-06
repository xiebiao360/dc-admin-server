import { GenderEnum } from '@app/common/enums/gender.enum';
import DateTransformer from '@app/common/transformers/Date.transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEntity } from './account.entity';

@Entity({ name: 'sys_user' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'enum', enum: GenderEnum, default: GenderEnum.unknow })
  gender: GenderEnum;

  @Column()
  name: string;

  @Column({ nullable: true, transformer: DateTransformer })
  birthday: Date;

  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @UpdateDateColumn({ name: 'update_date' })
  updateDate: Date;

  @OneToOne(() => AccountEntity, (entity) => entity.user)
  @JoinColumn()
  account: AccountEntity;
}
