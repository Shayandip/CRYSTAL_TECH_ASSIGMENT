import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { ADType, CompanyStatus, DefaultStatus, UserRole } from 'src/enum';
import { Brackets, Repository } from 'typeorm';
import {
  BusinessPaginationDto,
  CompanyStatusDto,
  CreateAccountDto,
  PaginationDto,
  StatusDto,
} from './dto/account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private readonly repo: Repository<Account>,
  ) {}
}
