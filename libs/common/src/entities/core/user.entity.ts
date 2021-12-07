import { GenderEnum } from '@app/common/enums/gender.enum';
import { dateTransformer } from '@app/common/transformers/date.transformer';
import { enumTransformer } from '@app/common/transformers/enum.transformer';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../base.entity';
import { AccountEntity } from './account.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'sys_user' })
export class UserEntity extends BaseEntity {
  @Column({
    type: 'enum',
    enum: GenderEnum,
    default: GenderEnum.unknow,
    transformer: enumTransformer(GenderEnum),
  })
  gender: GenderEnum;

  @Column({ length: 64 })
  name: string;

  @Column({ nullable: true, transformer: dateTransformer() })
  birthday: Date;

  @Exclude()
  @OneToOne(() => AccountEntity, (entity) => entity.user, { cascade: true })
  @JoinColumn()
  account: AccountEntity;

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];
}
