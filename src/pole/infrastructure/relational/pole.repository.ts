import { FilterPoleDto } from 'src/pole/dto/query-pole.dto';
import { PoleEntity } from './entities/pole.entity';
import { Pole } from 'src/pole/domain/pole';

export abstract class AbstractPoleRepository {
  abstract findById(id: number): Promise<PoleEntity>;
  abstract create(data: any): Promise<void>;
  abstract findMany({
    filterOptions,
  }: {
    filterOptions?: FilterPoleDto | null;
  }): Promise<Pole[]>;
}
