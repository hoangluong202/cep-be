import { Event } from 'src/event/domain/event';
import { EventEntity } from '../event.entity';

export class EventMapper {
  static toDomain(raw: EventEntity): Event {
    const event = new Event();
    event.id = raw.id;
    event.rule = raw.rule;
    return event;
  }

  static toPersistence(event: Event): EventEntity {
    const eventEntity = new EventEntity();
    eventEntity.id = event.id;
    eventEntity.rule = event.rule;
    return eventEntity;
  }
}
