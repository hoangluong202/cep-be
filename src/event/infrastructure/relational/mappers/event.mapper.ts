import { Event } from 'src/event/domain/event';
import { EventEntity } from '../entities/event.entity';
import { CalendarEntity } from 'src/calendar/infrustructure/relational/entities/calendar.entity';
import { SchedulerEntity } from 'src/scheduler/infrustrucure/relational/entities/scheduler.entity';
import { PoleEntity } from 'src/pole/infrastructure/relational/entities/pole.entity';
import { CalendarMapper } from 'src/calendar/infrustructure/relational/mappers/calendar.mapper';
import { SchedulerMapper } from 'src/scheduler/infrustrucure/relational/mappers/scheduler.mapper';
import { PoleMapper } from 'src/pole/infrastructure/relational/mappers/pole.mapper';

export class EventMapper {
  static toDomain(raw: EventEntity): Event {
    console.log(raw.calendar);
    const event = new Event();
    event.id = raw.id;
    event.rule = raw.rule;
    event.calendar = CalendarMapper.toDomain(raw.calendar);
    event.schedulers = raw.schedulers.map((scheduler) =>
      SchedulerMapper.toDomain(scheduler),
    );
    if (raw.polesArea) {
      event.polesArea = raw.polesArea.map((pole) => PoleMapper.toDomain(pole));
    }
    if (raw.polesRoad) {
      event.polesRoad = raw.polesRoad.map((pole) => PoleMapper.toDomain(pole));
    }
    if (raw.pole) {
      event.pole = PoleMapper.toDomain(raw.pole);
    }

    return event;
  }

  static toEntity(event: Omit<Event, 'id'>): EventEntity {
    const eventEntity = new EventEntity();
    eventEntity.rule = event.rule;

    const calendar: CalendarEntity = new CalendarEntity();
    calendar.id = event.calendar.id;
    eventEntity.calendar = calendar;

    const schedulers = event.schedulers.map((scheduler) => {
      const schedulerEntity = new SchedulerEntity();
      schedulerEntity.id = scheduler.id;
      return schedulerEntity;
    });
    eventEntity.schedulers = schedulers;

    if (event.polesArea) {
      const polesArea = event.polesArea.map((pole) => {
        const poleEntity = new PoleEntity();
        poleEntity.id = pole.id;
        return poleEntity;
      });
      eventEntity.polesArea = polesArea;
    }

    if (event.polesRoad) {
      const polesRoad = event.polesRoad.map((pole) => {
        const poleEntity = new PoleEntity();
        poleEntity.id = pole.id;
        return poleEntity;
      });
      eventEntity.polesRoad = polesRoad;
    }

    if (event.pole) {
      const pole = new PoleEntity();
      pole.id = event.pole.id;
      eventEntity.pole = pole;
    }

    return eventEntity;
  }
}
