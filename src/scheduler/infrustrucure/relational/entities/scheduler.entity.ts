import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('scheduler')
export class SchedulerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  area: string;

  @Column({ type: Number })
  poleId: number;

  @Column()
  time: Date;

  @Column({ type: Number })
  lightLevel: number;
}
