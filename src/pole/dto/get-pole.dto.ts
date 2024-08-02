import { Pole } from '../domain/pole';

export class GetPolesDto {
  id: string;
  area: string;
  road: string;
  position: {
    lat: number;
    lng: number;
  };
  status: boolean;
  level: number;
  burningHours: number;
  frequency: number;

  constructor(pole: Pole) {
    this.id = pole.id.toString();
    this.area = pole.area;
    this.road = pole.road;
    this.position = {
      lat: parseFloat(pole.latitude.toString()),
      lng: parseFloat(pole.longitude.toString()),
    };
    this.status = pole.status;
    this.level = parseInt(pole.lightLevel.toString());
    this.burningHours = Math.floor(
      parseFloat(pole.burningTime.toString()) / 3600,
    );
    this.frequency = parseInt(pole.frequency.toString());
  }
}
