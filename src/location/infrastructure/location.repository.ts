import { NullableType } from 'src/utils/types/nullable.type';
import { Location } from '../domain/location';

export abstract class LocationRepository {
  abstract findAllAreas(): Promise<Location[]>;
  abstract findAreasByKey(
    areaKey: Location['areaKey'],
  ): Promise<NullableType<Location[]>>;
  abstract findGroupsByArea(areaKey: Location['areaKey']): Promise<Location[]>;
  abstract findGroupByName(groupName: Location['groupName']): Promise<Location>;
  abstract createGroup(
    groupData: Omit<Location, 'id'>,
  ): Promise<NullableType<Location>>;
}
