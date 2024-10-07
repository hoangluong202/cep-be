import { LocationEntity } from '../entities/location.entity';
import { Location } from '../../../../location/domain/location';
import { SmartPoleMapper } from 'src/smartpole/infrastructure/relational/mappers/smartpole.mapper';

export class LocationMapper {
  static toDomain(raw: LocationEntity): Location {
    const domainEntity = new Location();
    domainEntity.id = raw.id;
    domainEntity.areaKey = raw.areaKey;
    domainEntity.areaName = raw.areaName;
    domainEntity.groupKey = raw.groupKey;
    domainEntity.groupName = raw.groupName;
    domainEntity.latitude = raw.latitude;
    domainEntity.longitude = raw.longitude;
    if (raw?.smartPoles?.length > 0) {
      domainEntity.smartPoles = raw.smartPoles.map((smartPole) =>
        SmartPoleMapper.toDomain(smartPole),
      );
    }
    return domainEntity;
  }
}
