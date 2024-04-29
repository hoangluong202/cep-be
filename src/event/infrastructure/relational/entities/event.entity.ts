import { CalendarEntity } from 'src/calendar/infrustructure/relational/entities/calendar.entity';
import { SchedulerEntity } from 'src/scheduler/infrustrucure/relational/entities/scheduler.entity';
import { PoleEntity } from 'src/pole/infrastructure/relational/entities/pole.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  rule: string;

  @Column({ type: 'varchar' })
  type: string;

  @ManyToOne(() => CalendarEntity, (calendar) => calendar.events)
  calendar: CalendarEntity;

  @ManyToMany(() => PoleEntity)
  @JoinTable()
  poles: PoleEntity[];

  @OneToMany(() => SchedulerEntity, (scheduler) => scheduler.event, {
    onDelete: 'CASCADE',
  })
  schedulers: SchedulerEntity[];
}
