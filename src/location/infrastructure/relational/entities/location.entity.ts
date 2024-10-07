import { SmartPoleEntity } from 'src/smartpole/infrastructure/relational/entities/smartpole.entity';
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
  areaKey: string;

  @Column({ type: 'varchar', nullable: true })
  areaName: string | null;

  @Column({ type: 'varchar', nullable: true })
  groupKey: string | null;

  @Column({ type: 'varchar', nullable: true })
  groupName: string | null;

  @Column({ type: 'numeric' })
  latitude: number;

  @Column({ type: 'numeric' })
  longitude: number;

  @ManyToMany(() => SmartPoleEntity, (smartPole) => smartPole.locations)
  @JoinTable({
    name: 'locations_smartpoles',
    joinColumn: { name: 'location_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'smartpole_id', referencedColumnName: 'id' },
  })
  smartPoles: SmartPoleEntity[];
}
