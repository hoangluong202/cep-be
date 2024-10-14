import { GroupResponseDto } from './group-response.dto';
import { Location } from '../domain/location';

export class AreaWithGroupsResDto {
  id: number;
  areaKey: string;
  areaName: string | null;
  latitude: number;
  longitude: number;
  groups: GroupResponseDto[];

  constructor(areas: Location[]) {
    const area = areas.filter((area) => area.groupKey === null)[0];
    const groups = areas.filter((area) => area.groupKey !== null);
    this.id = area.id;
    this.areaKey = area.areaKey;
    this.areaName = area.areaName;
    this.latitude = area.latitude;
    this.longitude = area.longitude;
    this.groups =
      groups.length > 0
        ? groups.map((group) => new GroupResponseDto(group))
        : [];
  }
}
