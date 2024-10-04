import { LocationEntity } from '../entities/location.entity';
import { Location } from '../../../../location/domain/location';

export class LocationMapper {
  static toDomain(raw: LocationEntity): Location {
    const domainEntity = new Location();
    domainEntity.id = raw.id;
    domainEntity.area = raw.area;
    domainEntity.group = raw.group;
    domainEntity.latitude = raw.latitude;
    domainEntity.longitude = raw.longitude;
    return domainEntity;
  }
}
