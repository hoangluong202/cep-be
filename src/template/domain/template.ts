export class Calendar {
  id: number;
  name: string;
  configLightLevel: {
    startHour: string;
    endHour: string;
    lightLevel: number;
  }[];
}
