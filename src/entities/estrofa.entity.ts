import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Cancion } from './cancion.entity';

@Entity()
export class Estrofa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column('text')
  texto: string;

  @Column({ default: false })
  es_coro: boolean;

  @ManyToOne(() => Cancion, (cancion) => cancion.estrofas)
  @JoinColumn({ name: 'cancion_id' })
  cancion: Cancion;
}
