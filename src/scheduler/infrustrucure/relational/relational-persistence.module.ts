import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerEntity } from './entities/scheduler.entity';
import { SchedulerRelationalRepository } from './repositories/scheduler.repository';
import { SchedulerRepository } from '../scheduler.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SchedulerEntity])],
  providers: [
    {
      provide: SchedulerRepository,
      useClass: SchedulerRelationalRepository,
    },
  ],
  exports: [SchedulerRepository],
})
export class RelationalSchedulerPersistenceModule {}
