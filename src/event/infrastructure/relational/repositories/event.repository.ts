import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from '../entities/event.entity';
import { Repository } from 'typeorm';
import { Event } from '../../../../event/domain/event';
import { NullableType } from '../../../../utils/types/nullable.type';
import { EventMapper } from '../mappers/event.mapper';
import { EventRepository } from '../../event.repository';

@Injectable()
export class EventRelationalRepository implements EventRepository {
  constructor(
    @InjectRepository(EventEntity)
    private readonly repository: Repository<EventEntity>,
  ) {}

  async findById(id: Event['id']): Promise<NullableType<Event>> {
    const event = await this.repository.findOne({
      where: { id },
    });
    return event ? EventMapper.toDomain(event) : null;
  }
}
