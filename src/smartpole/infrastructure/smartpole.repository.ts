import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { NullableType } from '../../utils/types/nullable.type';
import { SmartPole } from '../domain/smartpole';
import {
  FilterSmartPoleDto,
  SortSmartPoleDto,
} from '../dto/query-smartpole.dto';

export abstract class SmartPoleRepository {
  abstract findById(id: SmartPole['id']): Promise<NullableType<SmartPole>>;
  abstract findByIds(ids: SmartPole['id'][]): Promise<SmartPole[]>;
  abstract findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterSmartPoleDto | null;
    sortOptions?: SortSmartPoleDto[] | null;
    paginationOptions?: IPaginationOptions;
  }): Promise<SmartPole[]>;
}
