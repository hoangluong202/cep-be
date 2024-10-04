import { NullableType } from '../../utils/types/nullable.type';
import { SmartPole } from '../domain/smartpole';

export abstract class SmartPoleRepository {
  abstract findById(id: SmartPole['id']): Promise<NullableType<SmartPole>>;
}
