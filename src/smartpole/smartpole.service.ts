import { Injectable } from '@nestjs/common';
import { SmartPoleRepository } from './infrastructure/smartpole.repository';
import { SmartPole } from './domain/smartpole';
import { NullableType } from '../utils/types/nullable.type';
import {
  FilterSmartPoleDto,
  SortSmartPoleDto,
} from './dto/query-smartpole.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';

@Injectable()
export class SmartPoleService {
  constructor(private readonly smartPoleRepository: SmartPoleRepository) {}

  findById(id: SmartPole['id']): Promise<NullableType<SmartPole>> {
    return this.smartPoleRepository.findById(id);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterSmartPoleDto | null;
    sortOptions?: SortSmartPoleDto[] | null;
    paginationOptions?: IPaginationOptions;
  }): Promise<SmartPole[]> {
    return this.smartPoleRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }
}
