import { Injectable } from '@nestjs/common';
import { CalendarRepository } from './infrustructure/relational/repositories/calendar.repository';
import { Calendar } from './domain/calendar';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class CalendarService {
  constructor(private readonly calendarRepository: CalendarRepository) {}

  findById(id: number): Promise<NullableType<Calendar>> {
    return this.calendarRepository.findById(id);
  }

  findMany(): Promise<NullableType<Calendar[]>> {
    return this.calendarRepository.findMany();
  }

  async create(createCalendarDto: CreateCalendarDto): Promise<Calendar> {
    const calendarPayload = new Calendar();
    calendarPayload.name = createCalendarDto.name;
    calendarPayload.configLightLevel = createCalendarDto.configLightLevel;
    return this.calendarRepository.create(calendarPayload);
  }
}
