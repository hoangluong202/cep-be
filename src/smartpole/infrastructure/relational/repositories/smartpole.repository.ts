import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmartPoleEntity } from '../entities/smartpole.entity';
import { In, Repository } from 'typeorm';
import { SmartPoleRepository } from '../../smartpole.repository';
import { SmartPole } from '../../../../smartpole/domain/smartpole';
import { NullableType } from 'src/utils/types/nullable.type';
import { SmartPoleMapper } from '../mappers/smartpole.mapper';
import {
  FilterSmartPoleDto,
  SortSmartPoleDto,
} from '../../../../smartpole/dto/query-smartpole.dto';
import { IPaginationOptions } from '../../../../utils/types/pagination-options';

@Injectable()
export class SmartPoleRelationalRepository implements SmartPoleRepository {
  constructor(
    @InjectRepository(SmartPoleEntity)
    private readonly smartPoleRepository: Repository<SmartPoleEntity>,
  ) {}

  async findById(id: SmartPole['id']): Promise<NullableType<SmartPole>> {
    const smartPoleEntity = await this.smartPoleRepository.findOne({
      where: { id },
      relations: ['locations'],
    });
    return smartPoleEntity ? SmartPoleMapper.toDomain(smartPoleEntity) : null;
  }

  async findByIds(ids: SmartPole['id'][]): Promise<SmartPole[]> {
    const smartPoleEntities = await this.smartPoleRepository.findBy({
      id: In(ids),
    });
    return smartPoleEntities.map((entity) => SmartPoleMapper.toDomain(entity));
  }

  async findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterSmartPoleDto | null;
    sortOptions?: SortSmartPoleDto[] | null;
    paginationOptions?: IPaginationOptions;
  }): Promise<SmartPole[]> {
    const page = paginationOptions?.page;
    const limit = paginationOptions?.limit;
    const entities = await this.smartPoleRepository.find({
      skip:
        undefined !== page && undefined !== limit
          ? (page - 1) * limit
          : undefined,
      take: undefined !== limit ? limit : undefined,
      where: {
        status: filterOptions?.status,
        locations: {
          areaKey: filterOptions?.areaKey,
          groupKey: filterOptions?.groupKey,
        },
      },
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
      relations: ['locations'],
    });
    return entities.map((entity) => SmartPoleMapper.toDomain(entity));
  }
}
