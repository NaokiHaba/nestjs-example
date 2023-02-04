import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @MaxLength(255)
  @IsNotEmpty()
  name: string;
}
