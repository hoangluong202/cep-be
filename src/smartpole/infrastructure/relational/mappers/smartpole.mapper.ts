import { LocationMapper } from 'src/location/infrastructure/relational/mappers/location.mapper';
import { SmartPole } from '../../../domain/smartpole';
import { SmartPoleEntity } from '../entities/smartpole.entity';

export class SmartPoleMapper {
  static toDomain(raw: SmartPoleEntity): SmartPole {
    const smartPole = new SmartPole();
    smartPole.id = raw.id;
    smartPole.latitude = raw.latitude;
    smartPole.longitude = raw.longitude;
    smartPole.status = raw.status;
    smartPole.dimming = raw.dimming;
    smartPole.frequency = raw.frequency;
    smartPole.burningDuration = raw.burningDuration;
    smartPole.voltage = raw.voltage;
    smartPole.current = raw.current;
    smartPole.power = raw.power;

    if (raw?.locations?.length > 0) {
      smartPole.locations = raw.locations.map((location) =>
        LocationMapper.toDomain(location),
      );
    }
    return smartPole;
  }
}
