import { Injectable } from '@nestjs/common';
import { Scheduler } from './domain/scheduler';
import { NullableType } from 'src/utils/types/nullable.type';
import { rrulestr } from 'rrule';
import { SchedulerRepository } from './infrustrucure/relational/repositories/scheduler.repository';

@Injectable()
export class SchedulerService {
  constructor(private readonly schedulerRepository: SchedulerRepository) {}

  async findById(id: number): Promise<NullableType<Scheduler>> {
    return this.schedulerRepository.findById(id);
  }

  async createMany(createScheduler: {
    configLightLevel: {
      startHour: string;
      endHour: string;
      lightLevel: number;
    }[];
    poleIds: number[];
    rule: string;
  }): Promise<Scheduler[]> {
    const rule = rrulestr(createScheduler.rule);
    const dateSlices = rule.all();
    const configLightLevel = createScheduler.configLightLevel;

    const timeSlices = dateSlices.flatMap((date) => {
      return configLightLevel.map((data) => {
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

    const poleIds = createScheduler.poleIds;
    const schedulerPayloads = timeSlices.flatMap((data) => {
      return poleIds.map((poleId) => {
        return {
          id: undefined,
          poleId: poleId,
          time: data.time,
          lightLevel: data.lightLevel,
        };
      });
    });

    return this.schedulerRepository.createMany(schedulerPayloads);
  }
}
