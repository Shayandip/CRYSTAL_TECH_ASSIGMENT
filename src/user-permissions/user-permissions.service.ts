import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Repository } from 'typeorm';
import {
  CreateUserPermissionDto,
  UpdateUserPermissionDto,
} from './dto/permission.dto';
import { UserPermission } from './entities/user-permission.entity';

@Injectable()
export class UserPermissionsService {
  constructor(
    @InjectRepository(UserPermission)
    private readonly repo: Repository<UserPermission>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateUserPermissionDto[]) {
    return this.repo.save(dto);
  }

  async update(dto: UpdateUserPermissionDto[]) {
    try {
      this.delPermissions(dto[0].accountId);
      return this.repo.save(dto);
    } catch (error) {
      throw new NotAcceptableException(
        'Something bad happened! Try after some time!',
      );
    }
  }

  private delPermissions(id: string) {
    this.cacheManager.del('userPermission' + id);
  }
}
