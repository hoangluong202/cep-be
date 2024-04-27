import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Scheduler } from 'src/scheduler/domain/scheduler';
import { Repository } from 'typeorm';
import { SchedulerEntity } from '../entities/scheduler.entity';
import { SchedulerMapper } from '../mappers/scheduler.mapper';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class SchedulerRepository implements SchedulerRepository {
  constructor(
    @InjectRepository(SchedulerEntity)
    private readonly schedulerRepository: Repository<SchedulerEntity>,
  ) {}

  async findById(id: number): Promise<NullableType<Scheduler>> {
    const scheduler = await this.schedulerRepository.findOneBy({ id: id });
    return scheduler ? SchedulerMapper.toDomain(scheduler) : null;
  }

  async create(data: Scheduler): Promise<Scheduler> {
    try {
      const persistedScheduler = SchedulerMapper.toPersistence(data);
      const newScheduler = await this.schedulerRepository.save(
        this.schedulerRepository.create(persistedScheduler),
      );
      return SchedulerMapper.toDomain(newScheduler);
    } catch (err) {
      throw new Error(err);
    }
  }
}
