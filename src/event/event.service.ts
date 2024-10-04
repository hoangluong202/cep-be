import { Injectable } from '@nestjs/common';
import { Event } from './domain/event';
import { NullableType } from '../utils/types/nullable.type';
import { EventRepository } from './infrastructure/event.repository';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  findById(id: Event['id']): Promise<NullableType<Event>> {
    return this.eventRepository.findById(id);
  }
}
