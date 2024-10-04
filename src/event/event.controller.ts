import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { EventService } from './event.service';
import { Event } from './domain/event';
import { AuthGuard } from 'src/auth/auth.guard';
@ApiTags('Event')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Event })
  @ApiParam({ name: 'id', type: 'number', required: true })
  findById(@Param('id') id: Event['id']): Promise<Event> {
    const event = this.eventService.findById(id);
    if (!event) {
      throw new BadRequestException('Event not found');
    }
    return event;
  }
}
