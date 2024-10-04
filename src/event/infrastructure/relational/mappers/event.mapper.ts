import { Event } from 'src/event/domain/event';
import { EventEntity } from '../entities/event.entity';
import { CalendarEntity } from 'src/calendar/infrustructure/relational/entities/calendar.entity';
import { SchedulerEntity } from 'src/scheduler/infrustrucure/relational/entities/scheduler.entity';
import { SmartPoleEntity } from 'src/smartpole/infrastructure/relational/entities/smartpole.entity';
import { CalendarMapper } from 'src/calendar/infrustructure/relational/mappers/calendar.mapper';
import { SchedulerMapper } from 'src/scheduler/infrustrucure/relational/mappers/scheduler.mapper';
import { SmartPoleMapper } from 'src/smartpole/infrastructure/relational/mappers/smartpole.mapper';

export class EventMapper {
  static toDomain(raw: EventEntity): Event {
    console.log(raw.calendar);
    const event = new Event();
    event.id = raw.id;
    event.rule = raw.rule;
    event.type = raw.type;
    event.calendar = CalendarMapper.toDomain(raw.calendar);
    event.schedulers = raw.schedulers.map((scheduler) =>
      SchedulerMapper.toDomain(scheduler),
    );
    event.poles = raw.poles.map((pole) => SmartPoleMapper.toDomain(pole));
    return event;
  }

  static toEntity(event: Omit<Event, 'id'>): EventEntity {
    const eventEntity = new EventEntity();
    eventEntity.rule = event.rule;
    eventEntity.type = event.type;

    const calendar: CalendarEntity = new CalendarEntity();
    calendar.id = event.calendar.id;
    eventEntity.calendar = calendar;

    const schedulers = event.schedulers.map((scheduler) => {
      const schedulerEntity = new SchedulerEntity();
      schedulerEntity.id = scheduler.id;
      return schedulerEntity;
    });
    eventEntity.schedulers = schedulers;

    const poles = event.poles.map((pole) => {
      const poleEntity = new SmartPoleEntity();
      poleEntity.id = pole.id;
      return poleEntity;
    });
    eventEntity.poles = poles;

    return eventEntity;
  }
}
