import { Module } from '@nestjs/common';
import { SchedulerController } from './scheduler.controller';
import { SchedulerService } from './scheduler.service';
import { RelationalSchedulerPersistenceModule } from './infrustrucure/relational/relational-persistence.module';

@Module({
  imports: [RelationalSchedulerPersistenceModule],
  controllers: [SchedulerController],
  providers: [SchedulerService],
  exports: [SchedulerService, RelationalSchedulerPersistenceModule],
})
export class SchedulerModule {}
