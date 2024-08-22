import { Injectable } from '@nestjs/common';
import { PoleRepository as PoleRepository } from './infrastructure/relational/repositories/pole.repository';
import { FilterPoleDto as FilterPoleDto } from './dto/query-pole.dto';
import { Pole } from './domain/pole';

@Injectable()
export class PoleService {
  constructor(private readonly poleRepository: PoleRepository) {}

  findById(id: number) {
    return this.poleRepository.findById(id);
  }

  create(data: any) {
    return this.poleRepository.create(data);
  }

  findMany({
    filterOptions,
  }: {
    filterOptions: FilterPoleDto;
  }): Promise<Pole[]> {
    return this.poleRepository.findMany({ filterOptions });
  }
}
