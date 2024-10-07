import { LocationEntity } from '../../../../location/infrastructure/relational/entities/location.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'smartpoles' })
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

  @Column({ type: 'numeric', name: 'burning_duration' })
  burningDuration: number;

  @Column({ type: 'numeric' })
  voltage: number;

  @Column({ type: 'numeric' })
  current: number;

  @Column({ type: 'numeric' })
  power: number;

  @ManyToMany(() => LocationEntity, (location) => location.smartPoles)
  locations: LocationEntity[];
}
