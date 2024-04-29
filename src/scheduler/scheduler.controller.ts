import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { SchedulerService } from './scheduler.service';
import { Scheduler } from './domain/scheduler';
import { NullableType } from 'src/utils/types/nullable.type';

@ApiTags('Scheduler')
@Controller('schedulers')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: 'number', required: true })
  findById(id: number): Promise<NullableType<Scheduler>> {
    return this.schedulerService.findById(id);
  }
}
