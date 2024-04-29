import { EventEntity } from 'src/event/infrastructure/relational/entities/event.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('scheduler')
export class SchedulerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: Number })
  poleId: number;

  @Column()
  time: Date;

  @Column({ type: Number })
  lightLevel: number;

  @ManyToOne(() => EventEntity, (eventEntity) => eventEntity.schedulers)
  event: EventEntity;
}
