export class Calendar {
  id: number;
  name: string;
  configLightLevel: {
    startHour: string;
    endHour: string;
    lightLevel: number;
  }[];
  constructor(
    id: number,
    name: string,
    configLightLevel: {
      startHour: string;
      endHour: string;
      lightLevel: number;
    }[],
  ) {
    this.id = id;
    this.name = name;
    this.configLightLevel = configLightLevel;
  }
}
