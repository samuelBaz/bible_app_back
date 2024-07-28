import { Injectable } from '@nestjs/common';
import { Bible } from 'src/entities/biblia.entity';
import { Book } from 'src/entities/libro.entity';
import { Between, DataSource } from 'typeorm';

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
    return this.dataSource.getRepository(Bible).find({
      where: {
        book: book.id,
        chapter: chapter,
        verse: Between(verseStart, verseEnd),
      },
      order: {
        verse: 'ASC',
      },
    });
  }
}
