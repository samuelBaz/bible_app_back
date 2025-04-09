import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Estrofa } from './estrofa.entity';

@Entity({ name: 'canciones' })
export class Cancion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  numero: number;

  @Column()
  himnario: string;

  @Column({ type: 'text', nullable: true })
  coro: string;

  @OneToMany(() => Estrofa, (estrofa) => estrofa.cancion)
  estrofas: Estrofa[];
}
