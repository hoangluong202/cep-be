import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Scheduler } from '../../../../scheduler/domain/scheduler';
import { Repository } from 'typeorm';
import { SchedulerEntity } from '../entities/scheduler.entity';
import { SchedulerMapper } from '../mappers/scheduler.mapper';
import { NullableType } from '../../../../utils/types/nullable.type';
import { SchedulerRepository } from '../../scheduler.repository';

@Injectable()
export class SchedulerRelationalRepository implements SchedulerRepository {
  constructor(
    @InjectRepository(SchedulerEntity)
    private readonly schedulerRepository: Repository<SchedulerEntity>,
  ) {}

  async findById(id: number): Promise<NullableType<Scheduler>> {
    const scheduler = await this.schedulerRepository.findOneBy({ id: id });
    return scheduler ? SchedulerMapper.toDomain(scheduler) : null;
  }
}
