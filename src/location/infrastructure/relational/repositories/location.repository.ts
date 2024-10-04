import { Injectable } from '@nestjs/common';
import { LocationRepository } from '../../location.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from '../entities/location.entity';
import { Repository } from 'typeorm';
import { NullableType } from '../../../../utils/types/nullable.type';
import { Location } from '../../../../location/domain/location';
import { LocationMapper } from '../mappers/location.mapper';

@Injectable()
export class LocationRelationalRepository implements LocationRepository {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}

  async findByArea(area: string): Promise<NullableType<Location>> {
    const entity = await this.locationRepository.findOneBy({ area: area });
    return entity ? LocationMapper.toDomain(entity) : null;
  }
}
