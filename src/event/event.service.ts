import { Injectable } from '@nestjs/common';
import { EventRepository } from './infrastructure/relational/repositories/event.repository';
import { Event } from './domain/event';
import { CreateEventDto } from './dto/create-event.dto';
import { NullableType } from 'src/utils/types/nullable.type';
import { PoleService } from 'src/pole/pole.service';
import { CalendarService } from 'src/calendar/calendar.service';
import { SchedulerService } from 'src/scheduler/scheduler.service';
import { FilterEventDto } from './dto/query-event.dto';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly poleService: PoleService,
    private readonly calendarService: CalendarService,
    private readonly schedulerService: SchedulerService,
  ) {}

  findById(id: Event['id']): Promise<NullableType<Event>> {
    return this.eventRepository.findById(id);
  }

  // async create(createEventDto: CreateEventDto): Promise<Event> {
  //   const calendar = await this.calendarService.findById(
  //     createEventDto.calendarId,
  //   );
  //   if (!calendar) {
  //     throw new Error('Calendar not found');
  //   }

  //   const filters = {
  //     area: createEventDto.area,
  //     road: createEventDto.road,
  //     poleId: createEventDto.poleId,
  //   };
  //   const poles = await this.poleService.findMany({ filterOptions: filters });
  //   if (poles.length === 0) {
  //     throw new Error('Pole not found');
  //   }

  //   const schedulers = await this.schedulerService.createMany({
  //     configLightLevel: calendar.configLightLevel,
  //     poleIds: poles.map((pole) => pole.id),
  //     rule: createEventDto.rule,
  //   });

  //   const type = createEventDto.poleId
  //     ? 'Pole'
  //     : createEventDto.road
  //     ? 'Road'
  //     : createEventDto.area
  //     ? 'Area'
  //     : null;
  //   if (!type) {
  //     throw new Error('Type not found');
  //   }

  //   const eventPayload: Omit<Event, 'id'> = {
  //     rule: createEventDto.rule,
  //     type: type,
  //     calendar: calendar,
  //     schedulers: schedulers,
  //     poles: poles,
  //   };
  //   return this.eventRepository.create(eventPayload);
  // }

  async findMany(filters?: FilterEventDto | null): Promise<Event[]> {
    const events = await this.eventRepository.findMany(filters);
    return events;
  }
}
