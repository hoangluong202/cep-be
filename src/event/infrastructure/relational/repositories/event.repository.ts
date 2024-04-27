import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '../entities/event.entity';
import { Repository } from 'typeorm';
import { Event } from 'src/event/domain/event';
import { NullableType } from 'src/utils/types/nullable.type';
import { EventMapper } from '../mappers/event.mapper';

@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repository: Repository<EventEntity>,
  ) {}

  async findById(id: Event['id']): Promise<NullableType<Event>> {
    const event = await this.repository.findOneBy({ id: id });
    return event ? EventMapper.toDomain(event) : null;
  }

  async create(data: Event): Promise<Event> {
    try {
      const persistedEvent = EventMapper.toPersistence(data);
      const newEvent = await this.repository.save(
        this.repository.create(persistedEvent),
      );
      return EventMapper.toDomain(newEvent);
    } catch (err) {
      throw new Error(err);
    }
  }
}
