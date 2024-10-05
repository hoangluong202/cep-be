import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locations')
export class LocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  area: string;

  @Column({ type: 'varchar', nullable: true })
  group: string | null;

  @Column({ type: 'numeric' })
  latitude: number;

  @Column({ type: 'numeric' })
  longitude: number;
}
