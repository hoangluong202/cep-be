import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarEntity } from '../entities/calendar.entity';
import { Injectable } from '@nestjs/common';
import { Calendar } from 'src/calendar/domain/calendar';
import { CalendarMapper } from '../mappers/calendar.mapper';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class CalendarRepository {
  constructor(
    @InjectRepository(CalendarEntity)
    private repository: Repository<CalendarEntity>,
  ) {}

  async findById(id: number): Promise<NullableType<Calendar>> {
    const calendar = await this.repository.findOneBy({ id: id });
    return calendar ? CalendarMapper.toDomain(calendar) : null;
  }

  async findMany(): Promise<NullableType<Calendar>[]> {
    const calendars = await this.repository.find();
    return calendars.map((calendar) => CalendarMapper.toDomain(calendar));
  }

  async create(data: Calendar): Promise<Calendar> {
    try {
      const entity = CalendarMapper.toEntity(data);
      const calendar = await this.repository.save(
        this.repository.create(entity),
      );
      return CalendarMapper.toDomain(calendar);
    } catch (err) {
      throw new Error(err);
    }
  }
}
