import { Injectable } from '@nestjs/common';
import { SchedulerRepository } from './infrustrucure/relational/repositories/scheduler.repository';
import { Scheduler } from './domain/scheduler';
import { NullableType } from 'src/utils/types/nullable.type';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';

@Injectable()
export class SchedulerService {
  constructor(private readonly schedulerRepository: SchedulerRepository) {}

  async findById(id: number): Promise<NullableType<Scheduler>> {
    return this.schedulerRepository.findById(id);
  }

  async create(createSchedulerDto: CreateSchedulerDto): Promise<Scheduler> {
    const schedulerPayload = new Scheduler();
    schedulerPayload.area = createSchedulerDto.area;
    schedulerPayload.poleId = createSchedulerDto.poleId;
    schedulerPayload.time = createSchedulerDto.time;
    schedulerPayload.lightLevel = createSchedulerDto.lightLevel;
    return this.schedulerRepository.create(schedulerPayload);
  }
}
