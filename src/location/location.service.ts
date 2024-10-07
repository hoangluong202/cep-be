import { BadRequestException, Injectable } from '@nestjs/common';
import { LocationRepository } from './infrastructure/location.repository';
import { Location } from './domain/location';
import { AreaResponseDto } from './dto/area-response.dto';
import { GroupResponseDto } from './dto/group-response.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { SmartPoleRepository } from '../smartpole/infrastructure/smartpole.repository';
import { DataSource } from 'typeorm';
import { convertVietnameseNameToKey } from '../utils/common/vietnamese.config';

@Injectable()
export class LocationService {
  constructor(
    private readonly locationRepository: LocationRepository,
    private readonly smartPoleRepository: SmartPoleRepository,
    private readonly dataSource: DataSource,
  ) {}

  async findAllAreas(): Promise<AreaResponseDto[]> {
    const areas = await this.locationRepository.findAllAreas();
    return areas.map((area) => new AreaResponseDto(area));
  }

  async findGroupsByArea(
    areaKey: Location['areaKey'],
  ): Promise<GroupResponseDto[]> {
    const location = await this.locationRepository.findGroupsByArea(areaKey);
    return location.map((group) => new GroupResponseDto(group));
  }

  async createGroup(
    areaKey: Location['areaKey'],
    createGroupDto: CreateGroupDto,
  ): Promise<GroupResponseDto> {
    const area = await this.locationRepository.findAreaByKey(areaKey);
    if (!area) {
      throw new BadRequestException('Khu vưc không tồn tại!');
    }

    const group = await this.locationRepository.findGroupByName(
      createGroupDto.groupName,
    );
    if (group) {
      throw new BadRequestException('Nhóm đã tồn tại!');
    }

    const smartPoles = await this.smartPoleRepository.findByIds(
      createGroupDto.smartPoleIds,
    );
    if (smartPoles.length !== createGroupDto.smartPoleIds.length) {
      throw new BadRequestException('Một số trụ đèn không tồn tại!');
    }

    const groupData: Omit<Location, 'id'> = {
      areaKey: areaKey,
      areaName: null,
      groupKey: convertVietnameseNameToKey(createGroupDto.groupName),
      groupName: createGroupDto.groupName,
      latitude: createGroupDto.latitude,
      longitude: createGroupDto.longitude,
      smartPoles: smartPoles,
    };

    try {
      const location = await this.locationRepository.createGroup(groupData);
      return new GroupResponseDto(location);
    } catch (error) {
      throw new BadRequestException('Tạo nhóm thất bại!');
    }
  }
}
