import { Injectable } from '@nestjs/common';
import { EventRepository } from './infrastructure/relational/repositories/event.repository';
import { Event } from './domain/event';
import { CreateEventDto } from './dto/create-event.dto';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  findById(id: Event['id']): Promise<NullableType<Event>> {
    return this.eventRepository.findById(id);
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const eventPayload = new Event();
    eventPayload.rule = createEventDto.rule;
    return this.eventRepository.create(eventPayload);
  }
}
