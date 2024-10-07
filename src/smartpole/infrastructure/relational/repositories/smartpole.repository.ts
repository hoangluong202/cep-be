import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SmartPoleEntity } from '../entities/smartpole.entity';
import { In, Repository } from 'typeorm';
import { SmartPoleRepository } from '../../smartpole.repository';
import { SmartPole } from '../../../../smartpole/domain/smartpole';
import { NullableType } from 'src/utils/types/nullable.type';
import { SmartPoleMapper } from '../mappers/smartpole.mapper';

@Injectable()
export class SmartPoleRelationalRepository implements SmartPoleRepository {
  constructor(
    @InjectRepository(SmartPoleEntity)
    private readonly smartPoleRepository: Repository<SmartPoleEntity>,
  ) {}

  async findById(id: SmartPole['id']): Promise<NullableType<SmartPole>> {
    const smartPoleEntity = await this.smartPoleRepository.findOneBy({
      id: id,
    });
    return smartPoleEntity ? SmartPoleMapper.toDomain(smartPoleEntity) : null;
  }

  async findByIds(ids: SmartPole['id'][]): Promise<SmartPole[]> {
    const smartPoleEntities = await this.smartPoleRepository.findBy({
      id: In(ids),
    });
    return smartPoleEntities.map((entity) => SmartPoleMapper.toDomain(entity));
  }
}
