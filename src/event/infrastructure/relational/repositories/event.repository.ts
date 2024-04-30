import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '../entities/event.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Event } from 'src/event/domain/event';
import { NullableType } from 'src/utils/types/nullable.type';
import { EventMapper } from '../mappers/event.mapper';
import { FilterEventDto } from 'src/event/dto/query-event.dto';

@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repository: Repository<EventEntity>,
  ) {}

  async findById(id: number): Promise<NullableType<Event>> {
    const event = await this.repository.findOne({
      where: { id },
      relations: ['calendar', 'schedulers', 'poles'],
    });
    console.log(event);
    return event ? EventMapper.toDomain(event) : null;
  }

  async create(data: Omit<Event, 'id'>): Promise<Event> {
    try {
      const persistedEvent = EventMapper.toEntity(data);
      const newEvent = await this.repository.save(
        this.repository.create(persistedEvent),
      );
      return EventMapper.toDomain(newEvent);
    } catch (err) {
      throw new Error(err);
    }
  }

  async findMany(filters?: FilterEventDto | null): Promise<Event[]> {
    const where: FindOptionsWhere<EventEntity> = {};
    if (filters?.area) {
      where.poles = [{ area: filters.area }];
    }
    if (filters?.road) {
      where.poles = [{ road: filters.road }];
    }
    if (filters?.poleId) {
      where.poles = [{ id: filters.poleId }];
    }
    const events = await this.repository.find({
      where: where,
      relations: ['calendar', 'schedulers', 'poles'],
    });
    console.log('List events', events);
    return events.map((event) => EventMapper.toDomain(event));
  }
}
