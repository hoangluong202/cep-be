import { Injectable } from '@nestjs/common';
import { Scheduler } from './domain/scheduler';
import { NullableType } from 'src/utils/types/nullable.type';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';
import { rrulestr } from 'rrule';
import { SchedulerRepository } from './infrustrucure/relational/repositories/scheduler.repository';
import { PoleService } from 'src/pole/pole.service';
import { CalendarService } from 'src/calendar/calendar.service';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly schedulerRepository: SchedulerRepository,
    private readonly poleService: PoleService,
    private readonly calendarService: CalendarService,
  ) {}

  async findById(id: number): Promise<NullableType<Scheduler>> {
    return this.schedulerRepository.findById(id);
  }

  async create(createSchedulerDto: CreateSchedulerDto): Promise<Scheduler[]> {
    const rule = rrulestr(createSchedulerDto.rule);
    const dateSlices = rule.all();

    const calendar = await this.calendarService.findById(
      createSchedulerDto.calendarId,
    );
    if (!calendar) {
      throw new Error('Calendar not found');
    }
    const hourSlices = calendar.configLightLevel;
    console.log('Check Calendar API', calendar);

    const timeSlices = dateSlices.flatMap((date) => {
      return hourSlices.map((data) => {
        const hour = parseInt(data.startHour.split(':')[0]);
        const minute = parseInt(data.startHour.split(':')[1]);
        const timeNumber = date.setUTCHours(hour, minute);
        const time = new Date(timeNumber);
        return {
          time: time,
          lightLevel: data.lightLevel,
        };
      });
    });
    // console.log(timeSlices);
    const filters = {
      area: createSchedulerDto.area,
      road: createSchedulerDto.road,
      poleId: createSchedulerDto.poleId,
    };

    const poles = await this.poleService.findMany({ filterOptions: filters });
    if (poles.length === 0) {
      throw new Error('Pole not found');
    }
    console.log('Check Pole API', poles);
    const poleIds = poles.map((pole) => pole.id);

    const schedulerPayloads = timeSlices.flatMap((data) => {
      return poleIds.map((poleId) => {
        return {
          id: undefined,
          calendarId: createSchedulerDto.calendarId,
          area: createSchedulerDto.area,
          poleId: poleId,
          time: data.time,
          lightLevel: data.lightLevel,
        };
      });
    });

    return this.schedulerRepository.createMany(schedulerPayloads);
  }
}
