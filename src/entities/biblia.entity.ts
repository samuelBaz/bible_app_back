import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bible_rv60' })
export class Bible {
  @PrimaryGeneratedColumn({ type: 'int' })
  book: number;

  @Column({ type: 'smallint' })
  chapter: number;

  @Column({ type: 'smallint' })
  verse: number;

  @Column({ type: 'longtext', charset: 'utf8mb3' })
  text: string;
}
