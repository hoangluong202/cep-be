import { Event } from '../domain/event';

export abstract class EventRepository {
  abstract findById(id: Event['id']): Promise<Event>;
}
