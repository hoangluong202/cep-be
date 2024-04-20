import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
