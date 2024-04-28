import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Scheduler } from 'src/scheduler/domain/scheduler';
import { Repository } from 'typeorm';
import { SchedulerEntity } from '../entities/scheduler.entity';
import { SchedulerMapper } from '../mappers/scheduler.mapper';
import { NullableType } from 'src/utils/types/nullable.type';

@Injectable()
export class SchedulerRepository {
  constructor(
    @InjectRepository(SchedulerEntity)
    private readonly schedulerRepository: Repository<SchedulerEntity>,
  ) {}

  async findById(id: number): Promise<NullableType<Scheduler>> {
    const scheduler = await this.schedulerRepository.findOneBy({ id: id });
    return scheduler ? SchedulerMapper.toDomain(scheduler) : null;
  }

  async createMany(data: Scheduler[]): Promise<Scheduler[]> {
    try {
      const persistedSchedulers = data.map((scheduler) =>
        SchedulerMapper.toPersistence(scheduler),
      );
      const schedulerEntities = await this.schedulerRepository.save(
        this.schedulerRepository.create(persistedSchedulers),
      );
      return schedulerEntities.map((schedulerEntity) =>
        SchedulerMapper.toDomain(schedulerEntity),
      );
    } catch (err) {
      throw new Error(err);
    }
  }
}
