import { Injectable } from '@nestjs/common';
import { LocationRepository } from '../../location.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from '../entities/location.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { Location } from '../../../../location/domain/location';
import { LocationMapper } from '../mappers/location.mapper';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class LocationRelationalRepository implements LocationRepository {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}

  async findAllAreas(): Promise<Location[]> {
    const entities = await this.locationRepository.find({
      where: {
        groupKey: IsNull(),
      },
      relations: {
        smartPoles: true,
      },
    });
    return entities.map((entity) => LocationMapper.toDomain(entity));
  }

  async findAreaByKey(areaKey: Location['areaKey']): Promise<Location> {
    const entity = await this.locationRepository.findOneBy({
      areaKey: areaKey,
      groupKey: null,
    });
    return LocationMapper.toDomain(entity);
  }

  async findGroupsByArea(areaKey: Location['areaKey']): Promise<Location[]> {
    console.log('areaKey', areaKey);
    const entities = await this.locationRepository.findBy({
      areaKey: areaKey,
      groupKey: Not(IsNull()),
    });
    return entities.map((entity) => LocationMapper.toDomain(entity));
  }

  async findGroupByName(
    groupName: Location['groupName'],
  ): Promise<NullableType<Location>> {
    const entity = await this.locationRepository.findOneBy({
      groupName: groupName,
    });
    return entity ? LocationMapper.toDomain(entity) : null;
  }

  async createGroup(
    groupData: Omit<Location, 'id'>,
  ): Promise<NullableType<Location>> {
    const entity = this.locationRepository.create(groupData);
    await this.locationRepository.save(entity);
    return entity ? LocationMapper.toDomain(entity) : null;
  }
}
