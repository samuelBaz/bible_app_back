import { Injectable } from '@nestjs/common';
import { Bible } from 'src/entities/biblia.entity';
import { Book } from 'src/entities/libro.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class BibleRepository {
  constructor(private dataSource: DataSource) {}

  async getAll(): Promise<Bible[]> {
    const query = this.dataSource.getRepository(Bible).find();

    return query;
  }

  async findVerses(
    book: Book,
    chapter: number,
    verseStart: number,
    verseEnd: number,
  ): Promise<Bible[]> {
    const query = `
      SELECT book.name, bible.chapter, bible.verse, bible.text
      FROM bible_rv60 bible
      INNER JOIN bible_rv60_books book ON bible.book = book.id
      WHERE book.id = ?
      AND bible.chapter = ?
      AND bible.verse BETWEEN ? AND ?
      ORDER BY bible.verse ASC
    `;

    const result = await this.dataSource.query(query, [
      book.id,
      chapter,
      verseStart,
      verseEnd,
    ]);
    console.log('Resultado:', result);

    return result;
  }

  async findChapter(book: Book, chapter: number): Promise<Bible[]> {
    const query = `
      SELECT book.name, bible.chapter, bible.verse, bible.text
      FROM bible_rv60 bible
      INNER JOIN bible_rv60_books book ON bible.book = book.id
      WHERE book.id = ?
      AND bible.chapter = ?
      ORDER BY bible.verse ASC
    `;

    const result = await this.dataSource.query(query, [book.id, chapter]);
    console.log('Resultado capítulo completo:', result);

    return result;
  }
}
