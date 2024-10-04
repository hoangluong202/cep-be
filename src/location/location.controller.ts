import {
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
import { AuthGuard } from '../auth/auth.guard';
import { LocationService } from './location.service';
import { Location } from './domain/location';

@ApiTags('location')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get(':area')
  @ApiParam({ name: 'area', type: String, required: true })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Location })
  findByArea(@Param('area') area: Location['area']): Promise<Location> {
    return this.locationService.findByArea(area);
  }
}
