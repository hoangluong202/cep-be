import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEntity } from './infrustructure/relational/entities/calendar.entity';
import { CalendarRepository } from './infrustructure/relational/repositories/calendar.repository';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEntity])],
  controllers: [TemplateController],
  providers: [TemplateService, CalendarRepository],
  exports: [TemplateService],
})
export class TemplateModule {}
