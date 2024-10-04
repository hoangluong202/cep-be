import { LocationEntity } from 'src/location/infrastructure/relational/entities/location.entity';
import { SchedulerEntity } from '../../../../scheduler/infrustrucure/relational/entities/scheduler.entity';
import { TemplateEntity } from '../../../../template/infrustructure/relational/entities/template.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  rule: string;

  @ManyToOne(() => TemplateEntity, (template) => template.events)
  @JoinColumn({ name: 'template_id' })
  template: TemplateEntity;

  @OneToOne(() => LocationEntity)
  @JoinColumn({ name: 'location_id' })
  location: LocationEntity;

  @OneToMany(() => SchedulerEntity, (scheduler) => scheduler.event, {
    onDelete: 'CASCADE',
  })
  schedulers: SchedulerEntity[];
}
