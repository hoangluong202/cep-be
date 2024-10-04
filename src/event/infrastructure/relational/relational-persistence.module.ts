import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { EventRelationalRepository } from './repositories/event.repository';
import { EventRepository } from '../event.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  providers: [
    {
      provide: EventRepository,
      useClass: EventRelationalRepository,
    },
  ],
  exports: [EventRepository],
})
export class RelationalEventPersistenceModule {}
