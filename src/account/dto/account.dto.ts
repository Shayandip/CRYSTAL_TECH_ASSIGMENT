import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ADType, CompanyStatus, DefaultStatus, UserRole } from 'src/enum';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  loginId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  name: string;

  @IsOptional()
  @IsDate()
  dob: Date;

  @IsNotEmpty()
  @IsEnum(UserRole)
  roles: UserRole;
}

export class DoctorAccountDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  loginId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(30)
  password: string;
}

export class PaginationDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(10)
  @Max(50)
  limit: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1000)
  offset: number;

  @IsOptional()
  @MinLength(0)
  @MaxLength(100)
  keyword: string;

  @IsOptional()
  @IsEnum(CompanyStatus)
  status: CompanyStatus;
}

export class BusinessPaginationDto{
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(10)
  @Max(50)
  limit: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1000)
  offset: number;

  @IsOptional()
  @MinLength(0)
  @MaxLength(100)
  keyword: string;

  @IsOptional()
  @IsEnum(CompanyStatus)
  status: CompanyStatus;
  
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10000000000000)
  maxPrice: number;

  @IsOptional()
  @IsString()
  timeStart: string;

  @IsOptional()
  @IsString()
  timeEnd: string;

  @IsOptional()
  @IsEnum(ADType)
  rating: ADType;
}

export class StatusDto {
  @IsNotEmpty()
  @IsEnum(DefaultStatus)
  status: DefaultStatus;
}

export class CompanyStatusDto {
  @IsNotEmpty()
  @IsEnum(CompanyStatus)
  status: CompanyStatus;
}
