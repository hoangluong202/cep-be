import { LocationEntity } from '../../../../location/infrastructure/relational/entities/location.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'smartPoles' })
export class SmartPoleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'numeric' })
  latitude: number;

  @Column({ type: 'numeric' })
  longitude: number;

  @Column({ type: 'boolean' })
  status: boolean;

  @Column({ type: 'numeric' })
  dimming: number;

  @Column({ type: 'numeric' })
  frequency: number;

  @Column({ type: 'numeric' })
  burningDuration: number;

  @Column({ type: 'numeric' })
  voltage: number;

  @Column({ type: 'numeric' })
  current: number;

  @Column({ type: 'numeric' })
  power: number;

  @ManyToMany(() => LocationEntity)
  @JoinTable()
  locations: LocationEntity[];
}
