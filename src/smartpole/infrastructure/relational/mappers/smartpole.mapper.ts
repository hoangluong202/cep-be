import { SmartPole } from '../../../domain/smartpole';
import { SmartPoleEntity } from '../entities/smartpole.entity';

export class SmartPoleMapper {
  static toDomain(poleEntity: SmartPoleEntity): SmartPole {
    const smartPole = new SmartPole();
    smartPole.id = poleEntity.id;
    smartPole.latitude = poleEntity.latitude;
    smartPole.longitude = poleEntity.longitude;
    smartPole.status = poleEntity.status;
    smartPole.dimming = poleEntity.dimming;
    smartPole.frequency = poleEntity.frequency;
    smartPole.burningDuration = poleEntity.burningDuration;
    smartPole.voltage = poleEntity.voltage;
    smartPole.current = poleEntity.current;
    smartPole.power = poleEntity.power;
    return smartPole;
  }
}
