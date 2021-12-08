import { IsEnum, Length } from 'class-validator';
import { GenderEnum } from '@app/common/enums/gender.enum';

export class UserCreateByLocalDto {
  @Length(1, 25)
  account: string;

  password: string;

  userName?: string;

  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  birthday?: Date;
}
