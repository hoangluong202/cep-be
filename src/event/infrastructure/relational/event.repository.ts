import { Event } from 'src/event/domain/event';

export abstract class EventRepository {
  abstract findById(id: Event['id']): Promise<Event>;
  abstract create(data: Omit<Event, 'id'>): Promise<Event>;
}
