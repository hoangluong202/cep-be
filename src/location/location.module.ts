import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
  getLocation() {
    return 'Location Service';
  }
}
