import { NullableType } from '../../utils/types/nullable.type';
import { Scheduler } from '../domain/scheduler';

export abstract class SchedulerRepository {
  abstract findById(id: Scheduler['id']): Promise<NullableType<Scheduler>>;
}
