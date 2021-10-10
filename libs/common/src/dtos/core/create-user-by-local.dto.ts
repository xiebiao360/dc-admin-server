import { GenderEnum } from '@app/common/enums/gender.enum';

export class CreateUserByLocalDto {
  account: string;
  password: string;
  userName?: string;
  gender?: GenderEnum;
  birthday?: Date;
}
