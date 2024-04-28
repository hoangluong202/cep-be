import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CalendarService } from './calendar.service';
import { Calendar } from './domain/calendar';
import { CreateCalendarDto } from './dto/create-calendar.dto';

@ApiTags('Calendar')
@Controller('calendars')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id')
  async findById(@Param('id') id: Calendar['id']): Promise<Calendar> {
    return this.calendarService.findById(id);
  }

  @ApiOkResponse({
    type: Calendar,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCalendarDto: CreateCalendarDto,
  ): Promise<Calendar> {
    return this.calendarService.create(createCalendarDto);
  }
}
