import { Scheduler } from '../../../../scheduler/domain/scheduler';
import { SchedulerEntity } from '../entities/scheduler.entity';

export class SchedulerMapper {
  static toDomain(raw: SchedulerEntity): Scheduler {
    const domainEntity = new Scheduler();
    domainEntity.id = raw.id;
    domainEntity.executionTime = raw.executionTime;
    domainEntity.area = raw.area;
    domainEntity.poleId = raw.poleId;
    domainEntity.dimming = raw.dimming;
    return domainEntity;
  }
}
