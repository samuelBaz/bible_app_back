import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Cancion } from './cancion.entity';

@Entity({ name: 'estrofas' })
export class Estrofa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column({ type: 'text' })
  texto: string;

  @ManyToOne(() => Cancion, (cancion) => cancion.estrofas)
  cancion: Cancion;
}
