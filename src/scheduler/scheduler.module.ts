import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerEntity } from './infrustrucure/relational/entities/scheduler.entity';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';
import { SchedulerRepository } from './infrustrucure/relational/repositories/scheduler.repository';
import { PoleModule } from 'src/pole/pole.module';
import { CalendarModule } from 'src/calendar/calendar.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SchedulerEntity]),
    CalendarModule,
    PoleModule,
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService, SchedulerRepository],
  exports: [SchedulerService],
})
export class SchedulerModule {}
