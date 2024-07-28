import { Inject, Injectable } from '@nestjs/common';
import { Bible } from 'src/entities/biblia.entity';
import { BibleRepository } from 'src/repositories/biblia.repository';
import { BookRepository } from 'src/repositories/libro.repository';

@Injectable()
export class BibleService {
  constructor(
    @Inject(BibleRepository)
    private bibleRepository: BibleRepository,
    @Inject(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  async getVerses(query: string): Promise<Bible[]> {
    const { bookAbbreviation, chapter, verseStart, verseEnd } =
      this.parseQuery(query);
    const book = await this.bookRepository.findByAbbreviation(bookAbbreviation);

    if (!book) {
      throw new Error('Book not found');
    }

    return this.bibleRepository.findVerses(book, chapter, verseStart, verseEnd);
  }

  private parseQuery(query: string) {
    // Ejemplo de entrada: "1 P 1 1-5"
    const parts = query.split(' ');

    if (parts.length < 3) {
      throw new Error('Invalid query format');
    }

    const bookAbbreviation = parts.slice(0, -2).join(' ');
    const chapter = Number(parts[parts.length - 2]);
    const [verseStart, verseEnd] = parts[parts.length - 1]
      .split('-')
      .map(Number);

    if (
      isNaN(chapter) ||
      isNaN(verseStart) ||
      (verseEnd !== undefined && isNaN(verseEnd))
    ) {
      throw new Error('Invalid query format');
    }

    return {
      bookAbbreviation,
      chapter,
      verseStart,
      verseEnd: verseEnd || verseStart, // si no hay un rango, usamos el mismo inicio como fin
    };
  }
}
