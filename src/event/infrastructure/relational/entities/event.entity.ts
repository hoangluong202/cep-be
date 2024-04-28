import { CalendarEntity } from 'src/calendar/infrustructure/relational/entities/calendar.entity';
import { SchedulerEntity } from 'src/scheduler/infrustrucure/relational/entities/scheduler.entity';
import { PoleEntity } from 'src/pole/infrastructure/relational/entities/pole.entity';
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

  @OneToMany(() => PoleEntity, (smartpole) => smartpole.eventArea)
  polesArea: PoleEntity[];

  @OneToMany(() => PoleEntity, (smartpole) => smartpole.eventRoad)
  polesRoad: PoleEntity[];

  @OneToOne(() => PoleEntity, (smartpole) => smartpole.eventPole)
  pole: PoleEntity;

  @OneToMany(() => SchedulerEntity, (scheduler) => scheduler.event, {
    onDelete: 'CASCADE',
  })
  schedulers: SchedulerEntity[];
}
