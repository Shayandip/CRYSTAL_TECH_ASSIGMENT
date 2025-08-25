import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Brackets, Repository } from 'typeorm';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private readonly repo: Repository<Employee>,
  ) {}

  async create(dto: CreateEmployeeDto) {
    const result = await this.repo.findOne({
      where: { name: dto.name, phone: dto.phone },
    });
    if (result) {
      throw new ConflictException(
        'Employee already exists with this name & phone.',
      );
    }
    const obj = Object.create(dto);
    return this.repo.save(obj);
  }

  async findAll(dto: CommonPaginationDto) {
    const keyword = dto.keyword || '';
    const query = await this.repo.createQueryBuilder('employee');
    if (keyword) {
        query.andWhere(
          new Brackets((qb) => {
            qb.where(
              'employee.name LIKE :keyword OR employee.phone LIKE :keyword OR employee.email LIKE :keyword ',
              {
                keyword: '%' + keyword + '%',
              },
            );
          }),
        )
    }
    const [result, total] = await query
      .orderBy({ 'employee.createdAt': 'DESC' })
      .take(dto.limit)
      .skip(dto.offset)
      .getManyAndCount();

    return { result, total };
  }

  async findOne(id: string) {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Employee not found!');
    }
    return result;
  }

  async update(id: string, dto: UpdateEmployeeDto) {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Employee not found!');
    }
    const obj = Object.assign(result, dto);
    return this.repo.save(obj);
  }

  async remove(id: string) {
    const result = await this.repo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Employee not found!');
    }
    return this.repo.remove(result);
  }
}
