import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PoleEntity } from '../entities/pole.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FilterPoleDto } from 'src/pole/dto/query-pole.dto';
import { Pole } from 'src/pole/domain/pole';
import { PoleMapper } from '../mappers/pole.mapper';

@Injectable()
export class PoleRepository implements PoleRepository {
  constructor(
    @InjectRepository(PoleEntity)
    private readonly poleRepository: Repository<PoleEntity>,
  ) {}

  findById(id: number): Promise<PoleEntity> {
    const pole = this.poleRepository.findOneBy({ id: id });
    if (!pole) {
      throw new Error('Pole not found');
    }
    return pole;
  }

  async create(data: any) {
    try {
      const pole = this.poleRepository.create(data);
      await this.poleRepository.save(pole);
    } catch (error) {
      throw new Error('Pole not created');
    }
  }

  async findMany({
    filterOptions,
  }: {
    filterOptions: FilterPoleDto;
  }): Promise<Pole[]> {
    const where: FindOptionsWhere<PoleEntity> = {};
    if (filterOptions.area != 'all') {
      where.area = filterOptions.area;
    }
    if (filterOptions.status != 'all') {
      where.status = filterOptions.status == 'active' ? true : false;
    }
    const poles = await this.poleRepository.find({
      where: where,
    });
    return poles.map((pole) => PoleMapper.toDomain(pole));
  }
}
