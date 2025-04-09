import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Bible } from './biblia.entity';

@Entity({ name: 'bible_rv60_books' }) // Nombre de la tabla en la base de datos
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  abreviation: string;

  @Column()
  testament: string;

  @OneToMany(() => Bible, (bible) => bible.bookEntity)
  bibles: Bible[];
}
