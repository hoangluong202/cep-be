import { EventEntity } from 'src/event/infrastructure/relational/entities/event.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'smartpole' })
export class SmartpoleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  area: string;

  @Column({ type: 'varchar' })
  road: string;

  @Column({ type: 'numeric' })
  latitude: number;

  @Column({ type: 'numeric' })
  longitude: number;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column({ type: 'numeric' })
  lightLevel: number;

  @Column({ type: 'numeric' })
  burningTime: number;

  @Column({ type: 'numeric' })
  frequency: number;

  @ManyToOne(() => EventEntity, (event) => event.polesArea, {
    onDelete: 'CASCADE',
  })
  eventArea?: EventEntity;

  @ManyToOne(() => EventEntity, (event) => event.polesRoad, {
    onDelete: 'CASCADE',
  })
  eventRoad?: EventEntity;

  @OneToOne(() => EventEntity, (event) => event.pole, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  eventPole?: EventEntity;
}
