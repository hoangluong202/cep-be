import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { RelationalEventPersistenceModule } from './infrastructure/relational/relational-persistence.module';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [RelationalEventPersistenceModule, LocationModule, SchedulerModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService, RelationalEventPersistenceModule],
})
export class EventModule {}
