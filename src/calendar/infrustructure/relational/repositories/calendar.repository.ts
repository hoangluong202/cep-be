import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarEntity } from '../entities/calendar.entity';
import { Injectable, Param } from '@nestjs/common';
import { Calendar } from 'src/calendar/domain/calendar';
import { CreateCalendarDto } from 'src/calendar/dto/create-calendar.dto';

@Injectable()
export class CalendarRepository {
  constructor(
    @InjectRepository(CalendarEntity)
    private repository: Repository<CalendarEntity>,
  ) {}

  async findById(id: Calendar['id']): Promise<CalendarEntity> {
    return this.repository.findOneBy({ id: id });
  }

  async create(data: CreateCalendarDto) {
    try {
      const calendar = this.repository.create(data);
      await this.repository.save(calendar);
    } catch (err) {
      throw new Error(err);
    }
  }
}
