import { EventEntity } from '../../../../event/infrastructure/relational/entities/event.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('schedulers')
export class SchedulerEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: Date, name: 'execution_time' })
  executionTime: Date;

  @Column({ type: String })
  area: string;

  @Column({ type: Number, name: 'pole_id' })
  poleId: number;

  @Column({ type: Number })
  dimming: number;

  @ManyToOne(() => EventEntity, (eventEntity) => eventEntity.schedulers)
  @JoinColumn({ name: 'event_id' })
  event: EventEntity;
}
