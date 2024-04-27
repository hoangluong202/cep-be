import { EventEntity } from 'src/event/infrastructure/relational/entities/event.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'calendar' })
export class CalendarEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'json' })
  configLightLevel: {
    startHour: string;
    endHour: string;
    lightLevel: number;
  }[];

  @OneToMany(() => EventEntity, (event) => event.calendar, {
    onDelete: 'CASCADE',
  })
  events: EventEntity[];
}
