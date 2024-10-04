import { Injectable } from '@nestjs/common';
import { LocationRepository } from './infrastructure/location.repository';
import { NullableType } from '../utils/types/nullable.type';
import { Location } from './domain/location';

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  findByArea(area: string): Promise<NullableType<Location>> {
    return this.locationRepository.findByArea(area);
  }
}
