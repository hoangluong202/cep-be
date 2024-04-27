import { CalendarEntity } from 'src/calendar/infrustructure/relational/entities/calendar.entity';
import { SchedulerEntity } from 'src/scheduler/infrustrucure/relational/entities/scheduler.entity';
import { SmartpoleEntity } from 'src/smartpole/infrastructure/relational/entities/smartpole.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  rule: string;

  @ManyToOne(() => CalendarEntity, (calendar) => calendar.events)
  calendar: CalendarEntity;

  @OneToMany(() => SmartpoleEntity, (smartpole) => smartpole.eventArea)
  polesArea: SmartpoleEntity[];

  @OneToMany(() => SmartpoleEntity, (smartpole) => smartpole.eventRoad)
  polesRoad: SmartpoleEntity[];

  @OneToOne(() => SmartpoleEntity, (smartpole) => smartpole.eventPole)
  pole: SmartpoleEntity;

  @OneToMany(() => SchedulerEntity, (scheduler) => scheduler.event, {
    onDelete: 'CASCADE',
  })
  schedulers: SchedulerEntity[];
}
