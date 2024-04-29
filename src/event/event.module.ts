import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './infrastructure/relational/entities/event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventRepository } from './infrastructure/relational/repositories/event.repository';
import { PoleModule } from 'src/pole/pole.module';
import { CalendarModule } from 'src/calendar/calendar.module';
import { SchedulerModule } from 'src/scheduler/scheduler.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity]),
    PoleModule,
    CalendarModule,
    SchedulerModule,
  ],
  controllers: [EventController],
  providers: [EventService, EventRepository],
  exports: [EventService],
})
export class EventModule {}
