import { Event } from '../../../../event/domain/event';
import { EventEntity } from '../entities/event.entity';
export class EventMapper {
  static toDomain(raw: EventEntity): Event {
    const event = new Event();
    event.id = raw.id;
    event.name = raw.name;
    event.rule = raw.rule;
    return event;
  }
}
