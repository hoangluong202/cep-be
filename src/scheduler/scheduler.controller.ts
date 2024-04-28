import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { SchedulerService } from './scheduler.service';
import { CreateSchedulerDto } from './dto/create-scheduler.dto';
import { Scheduler } from './domain/scheduler';
import { NullableType } from 'src/utils/types/nullable.type';

@ApiTags('Scheduler')
@Controller('scheduler')
export class SchedulerController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: 'number', required: true })
  findById(id: number): Promise<NullableType<Scheduler>> {
    return this.schedulerService.findById(id);
  }

  @ApiOkResponse({
    type: Scheduler,
    isArray: true,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSchedulerDto: CreateSchedulerDto): Promise<Scheduler[]> {
    return this.schedulerService.create(createSchedulerDto);
  }
}
