import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
