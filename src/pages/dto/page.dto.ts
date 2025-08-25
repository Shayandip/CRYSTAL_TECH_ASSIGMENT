import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class PageDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(50)
  @MaxLength(100000)
  desc: string;
}
