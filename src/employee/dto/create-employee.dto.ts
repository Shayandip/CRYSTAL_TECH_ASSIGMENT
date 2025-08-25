import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(55)
  name: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  phone: string;

  @IsNotEmpty()
  salary: string;

  @IsNotEmpty()
  date: string;
}
