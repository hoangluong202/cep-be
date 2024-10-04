import { EventEntity } from '../../../../event/infrastructure/relational/entities/event.entity';
import { DimmingSetting } from '../../../../template/domain/template';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'templates' })
export class TemplateEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  color: string;

  @Column({ type: 'json', name: 'dimming_setting' })
  dimmingSetting: DimmingSetting[];

  @OneToMany(() => EventEntity, (event) => event.template, {
    onDelete: 'CASCADE',
  })
  events: EventEntity[];
}
