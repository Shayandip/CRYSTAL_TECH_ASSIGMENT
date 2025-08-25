import { IsOptional } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  name: string;

  @IsOptional()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  salary: string;

  @IsOptional()
  date: string;
}
