import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'calendar' })
export class CalendarEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'jsonb', array: true })
  configLightLevel: {
    startHour: string;
    endHour: string;
    lightLevel: number;
  }[];
}
