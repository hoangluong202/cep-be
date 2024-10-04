import { SmartPoleEntity } from '../../../../smartpole/infrastructure/relational/entities/smartpole.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('locations')
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  area: string;

  @Column({ type: 'varchar' })
  group: string;

  @Column({ type: 'numeric' })
  latitude: number;

  @Column({ type: 'numeric' })
  longitude: number;

  @ManyToMany(() => SmartPoleEntity)
  @JoinTable()
  smartPoles: SmartPoleEntity[];
}
