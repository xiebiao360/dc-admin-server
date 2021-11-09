import { GenderEnum } from '@app/common/enums/gender.enum';
import { dateTransformer } from '@app/common/transformers/date.transformer';
import { enumTransformer } from '@app/common/transformers/enum.transformer';
import { Exclude } from 'class-transformer';
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

  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.unknow,
    transformer: enumTransformer(GenderEnum),
  })
  gender: GenderEnum;

  @Column()
  name: string;

  @Column({ nullable: true, transformer: dateTransformer() })
  birthday: Date;

  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @UpdateDateColumn({ name: 'update_date' })
  updateDate: Date;

  @Exclude()
  @OneToOne(() => AccountEntity, (entity) => entity.user, { cascade: true })
  @JoinColumn()
  account: AccountEntity;
}
