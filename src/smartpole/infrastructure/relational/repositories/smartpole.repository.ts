import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmartPoleEntity } from '../entities/smartpole.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { SmartPoleRepository } from '../../smartpole.repository';

@Injectable()
export class SmartPolesRelationalRepository implements SmartPoleRepository {
  constructor(
    @InjectRepository(SmartPoleEntity)
    private readonly poleRepository: Repository<SmartPoleEntity>,
  ) {}

  findById(id: number): Promise<SmartPoleEntity> {
    const pole = this.poleRepository.findOneBy({ id: id });
    if (!pole) {
      throw new Error('Pole not found');
    }
    return pole;
  }

  // async findMany({
  //   filterOptions,
  // }: {
  //   filterOptions: FilterPoleDto;
  // }): Promise<Pole[]> {
  //   const where: FindOptionsWhere<SmartPoleEntity> = {};
  //   if (filterOptions.area != 'all') {
  //     where.area = filterOptions.area;
  //   }
  //   if (filterOptions.status != 'all') {
  //     where.status = filterOptions.status == 'active' ? true : false;
  //   }
  //   const poles = await this.poleRepository.find({
  //     where: where,
  //   });
  //   return poles.map((pole) => SmartPoleMapper.toDomain(pole));
  // }
}
