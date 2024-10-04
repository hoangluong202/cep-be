import { CalendarEntity } from 'src/calendar/infrustructure/relational/entities/calendar.entity';
import { SchedulerEntity } from 'src/scheduler/infrustrucure/relational/entities/scheduler.entity';
import { SmartPoleEntity } from 'src/smartpole/infrastructure/relational/entities/smartpole.entity';
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

  @ManyToMany(() => SmartPoleEntity)
  @JoinTable()
  poles: SmartPoleEntity[];

  @OneToMany(() => SchedulerEntity, (scheduler) => scheduler.event, {
    onDelete: 'CASCADE',
  })
  schedulers: SchedulerEntity[];
}
