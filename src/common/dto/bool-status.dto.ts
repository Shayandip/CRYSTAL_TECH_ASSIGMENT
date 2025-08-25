import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class BoolStatusDto {
  @IsNotEmpty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  status: number;
}
