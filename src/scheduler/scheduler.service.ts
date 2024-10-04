import { Injectable } from '@nestjs/common';
import { Scheduler } from './domain/scheduler';
import { NullableType } from '../utils/types/nullable.type';
import { SchedulerRepository } from './infrustrucure/scheduler.repository';

@Injectable()
export class SchedulerService {
  constructor(private readonly schedulerRepository: SchedulerRepository) {}

  async findById(id: number): Promise<NullableType<Scheduler>> {
    return this.schedulerRepository.findById(id);
  }
}
