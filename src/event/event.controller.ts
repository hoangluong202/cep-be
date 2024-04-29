import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { Event } from './domain/event';
import { NullableType } from 'src/utils/types/nullable.type';
import { CreateEventDto } from './dto/create-event.dto';
import { FilterEventDto } from './dto/query-event.dto';

@ApiTags('Event')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: 'number', required: true })
  findById(@Param('id') id: Event['id']): Promise<NullableType<Event>> {
    return this.eventService.findById(id);
  }

  @ApiOkResponse({
    type: Event,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @ApiOkResponse({
    type: [Event],
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  findMany(@Query() filters?: FilterEventDto | null): Promise<Event[]> {
    return this.eventService.findMany(filters);
  }
}
