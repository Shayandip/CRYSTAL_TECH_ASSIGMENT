import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { Account } from 'src/account/entities/account.entity';
import { LogType, LoginType, UserRole } from 'src/enum';
import { UserPermission } from 'src/user-permissions/entities/user-permission.entity';
import APIFeatures from 'src/utils/apiFeatures.utils';
import { Repository } from 'typeorm';
import { CreateDetailDto, StaffLoinDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Account) private readonly repo: Repository<Account>,
    @InjectRepository(UserPermission)
    private readonly upRepo: Repository<UserPermission>,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async verifyOtp(
    phoneNumber: string,
    otp: number,
    ip: string,
    origin: string,
  ) {
    const user = await this.getUserDetails(phoneNumber);
    const sentOtp = await this.cacheManager.get(phoneNumber);

    // if (phoneNumber != '8092326469') {
    if (otp != sentOtp) {
      throw new UnauthorizedException('Invalid otp!');
    }
    // }
    const token = await APIFeatures.assignJwtToken(user.id, this.jwtService);

    if (user.roles == UserRole.USER) {
      if (user.userDetail[0].name == null) {
        return { token, latest: true, status: user.userDetail[0].status };
      } else {
        return { token, latest: false, status: user.userDetail[0].status };
      }
    }
    if (user.roles == UserRole.VENDOR) {
      if (user.companyDetail[0].name == null) {
        return { token, latest: true, status: user.companyDetail[0].status };
      } else {
        return { token, latest: false, status: user.companyDetail[0].status };
      }
    }
  }

  async signIn(loginId: string, password: string) {
    const admin = await this.getUserDetails(loginId, UserRole.ADMIN);
    const comparePassword = await bcrypt.compare(password, admin.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const token = await APIFeatures.assignJwtToken(admin.id, this.jwtService);
    return { token };
  }

  validate(id: string) {
    return this.getUserDetails(id);
  }

  findPermission(accountId: string) {
    return this.getPermissions(accountId);
  }

  private getPermissions = async (accountId: string): Promise<any> => {
    let result = await this.cacheManager.get('userPermission' + accountId);
    if (!result) {
      result = await this.upRepo.find({
        relations: ['permission', 'menu'],
        where: { accountId, status: true },
      });
      this.cacheManager.set(
        'userPermission' + accountId,
        result,
        7 * 24 * 60 * 60 * 1000,
      );
    }
    return result;
  };

  private getUserDetails = async (
    id: string,
    role?: UserRole,
  ): Promise<any> => {
    // let result = await this.cacheManager.get('userDetail' + id);
    // if (!result) {
    const query = this.repo
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.companyDetail', 'companyDetail')
      .leftJoinAndSelect('account.userDetail', 'userDetail')
      .select([
        'account.id',
        'account.password',
        'account.roles',
        'account.status',
        'account.createdBy',
        'companyDetail.id',
        'companyDetail.name',
        'companyDetail.status',
        'userDetail.id',
        'userDetail.name',
      ]);
    if (!role && role == UserRole.USER) {
      query.where('account.roles = :roles', { roles: UserRole.USER });
    }
    if (!role && role == UserRole.VENDOR) {
      query.where('account.roles IN (:...roles)', {
        roles: [UserRole.VENDOR, UserRole.STAFF],
      });
    }
    if (!role && role == UserRole.ADMIN) {
      query.where('account.roles IN (:...roles)', {
        roles: [UserRole.ADMIN, UserRole.EMPLOYEE],
      });
    }
    const result = await query
      .andWhere('account.id = :id OR account.phoneNumber = :phoneNumber', {
        id: id,
        phoneNumber: id,
      })
      .getOne();
    // this.cacheManager.set('userDetail' + id, result, 7 * 24 * 60 * 60 * 1000);
    // }
    if (!result) {
      throw new UnauthorizedException('Account not found!');
    }
    return result;
  };
}
