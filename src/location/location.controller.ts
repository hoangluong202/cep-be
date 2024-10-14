import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
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
import { AreaResponseDto } from './dto/area-response.dto';
import { GroupResponseDto } from './dto/group-response.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { NullableType } from '../utils/types/nullable.type';

@ApiTags('Location')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('areas')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [AreaResponseDto] })
  findAllAreas(): Promise<AreaResponseDto[]> {
    return this.locationService.findAllAreas();
  }

  @Get('areas/:areaKey')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AreaResponseDto })
  @ApiParam({ name: 'areaKey', type: Location['areaKey'], required: true })
  async findAreaByKey(
    @Param('areaKey') areaKey: Location['areaKey'],
  ): Promise<NullableType<AreaResponseDto>> {
    const test = await this.locationService.findAreaByKey(areaKey);
    return test;
  }

  @Get('areas/:areaKey/groups')
  @ApiParam({ name: 'areaKey', type: Location['areaKey'], required: true })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [GroupResponseDto] })
  findByArea(
    @Param('areaKey') areaKey: Location['areaKey'],
  ): Promise<GroupResponseDto[]> {
    return this.locationService.findGroupsByArea(areaKey);
  }

  @Post('areas/:areaKey/groups/')
  @ApiParam({ name: 'areaKey', type: String, required: true })
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: GroupResponseDto })
  createGroup(
    @Param('areaKey') areaKey: Location['areaKey'],
    @Body() createGroupDto: CreateGroupDto,
  ): Promise<GroupResponseDto> {
    return this.locationService.createGroup(areaKey, createGroupDto);
  }
}
