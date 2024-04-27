import { Scheduler } from 'src/scheduler/domain/scheduler';
import { SchedulerEntity } from '../entities/scheduler.entity';

export class SchedulerMapper {
  static toDomain(raw: SchedulerEntity): Scheduler {
    const scheduler = new Scheduler();
    scheduler.id = raw.id;
    scheduler.area = raw.area;
    scheduler.poleId = raw.poleId;
    scheduler.time = raw.time;
    scheduler.lightLevel = raw.lightLevel;
    return scheduler;
  }

  static toPersistence(scheduler: Scheduler): SchedulerEntity {
    const schedulerEntity = new SchedulerEntity();
    schedulerEntity.area = scheduler.area;
    schedulerEntity.poleId = scheduler.poleId;
    schedulerEntity.time = scheduler.time;
    schedulerEntity.lightLevel = scheduler.lightLevel;
    return schedulerEntity;
  }
}
