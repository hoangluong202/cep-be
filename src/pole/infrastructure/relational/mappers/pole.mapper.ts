import { Pole } from 'src/pole/domain/pole';
import { PoleEntity } from '../entities/pole.entity';

export class PoleMapper {
  static toDomain(poleEntity: PoleEntity): Pole {
    const pole = new Pole();
    pole.id = poleEntity.id;
    pole.name = poleEntity.name;
    pole.area = poleEntity.area;
    pole.road = poleEntity.road;
    pole.latitude = poleEntity.latitude;
    pole.longitude = poleEntity.longitude;
    pole.status = poleEntity.status;
    pole.lightLevel = poleEntity.lightLevel;
    pole.burningTime = poleEntity.burningTime;
    pole.frequency = poleEntity.frequency;
    return pole;
  }
}
