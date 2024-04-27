import { Scheduler } from 'src/scheduler/domain/scheduler';

export abstract class SchedulerRepository {
  abstract findById(id: number): Promise<Scheduler>;
  abstract create(data: Omit<Scheduler, 'id'>): Promise<Scheduler>;
}
