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
import { TemplateService } from './template.service';
import { Calendar } from './domain/template';
import { CreateCalendarDto } from './dto/create-calendar.dto';

@ApiTags('Calendar')
@Controller('calendars')
export class TemplateController {
  constructor(private readonly calendarService: TemplateService) {}

  @ApiParam({ name: 'id', type: 'number' })
  @Get(':id')
  async findById(@Param('id') id: Calendar['id']): Promise<Calendar> {
    return this.calendarService.findById(id);
  }

  @Get('')
  async findMany(): Promise<Calendar[]> {
    return this.calendarService.findMany();
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
