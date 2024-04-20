import { Injectable } from '@nestjs/common';
import { CalendarRepository } from './infrustructure/relational/repositories/calendar.repository';
import { Calendar } from './domain/calendar';
import { CreateCalendarDto } from './dto/create-calendar.dto';

@Injectable()
export class CalendarService {
  constructor(private readonly calendarRepository: CalendarRepository) {}

  findById(id: Calendar['id']): Promise<Calendar> {
    return this.calendarRepository.findById(id);
  }

  create(data: CreateCalendarDto) {
    return this.calendarRepository.create(data);
  }
}
