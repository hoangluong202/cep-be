import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './infrastructure/relational/event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventRepository } from './infrastructure/relational/repositories/event.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [EventController],
  providers: [EventService, EventRepository],
  exports: [EventService],
})
export class EventModule {}
