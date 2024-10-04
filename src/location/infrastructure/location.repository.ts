import { NullableType } from '../../utils/types/nullable.type';
import { Location } from '../domain/location';

export abstract class LocationRepository {
  abstract findByArea(area: Location['area']): Promise<NullableType<Location>>;
}
