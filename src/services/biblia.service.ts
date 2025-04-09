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
    const { bookName, chapter, verseStart, verseEnd } = this.parseQuery(query);
    console.log('Buscando libro:', bookName);

    const book = await this.bookRepository.findByAbbreviation(bookName);
    console.log('Libro encontrado:', book);
    console.log('Versos buscados:', chapter, verseStart, verseEnd);

    if (!book) {
      throw new Error('Libro no encontrado');
    }

    if (verseStart === null && verseEnd === null) {
      return await this.bibleRepository.findChapter(book, chapter);
    } else
      return await this.bibleRepository.findVerses(
        book,
        chapter,
        verseStart,
        verseEnd,
      );
  }

  private parseQuery(query: string) {
    // Ejemplos de entrada:
    // "Salmos 4:5-9" -> ["Salmos", "4:5-9"]
    // "1 Pedro 1:1-10" -> ["1", "Pedro", "1:1-10"]
    // "Salmos 5" -> ["Salmos", "5"]

    const parts = query.split(' ');
    let bookName;
    let chapterAndVerses;

    if (parts.length > 2) {
      // Caso de libros con número (1 Pedro)
      bookName = parts[0] + ' ' + parts[1];
      chapterAndVerses = parts[2];
    } else {
      // Caso de libros sin número (Salmos)
      bookName = parts[0];
      chapterAndVerses = parts[1];
    }

    // Verificamos si hay versículos especificados
    const hasVerses = chapterAndVerses.includes(':');
    const chapter = Number(
      hasVerses ? chapterAndVerses.split(':')[0] : chapterAndVerses,
    );

    if (isNaN(chapter)) {
      throw new Error('Formato de capítulo inválido');
    }

    let verseStart = null;
    let verseEnd = null;

    // Solo procesamos versículos si están especificados
    if (hasVerses) {
      const versesPart = chapterAndVerses.split(':')[1];
      const [start, end] = versesPart.split('-').map(Number);
      verseStart = start;
      verseEnd = end || start;

      if (isNaN(verseStart) || isNaN(verseEnd)) {
        throw new Error('Formato de versículo inválido');
      }
    }

    return {
      bookName,
      chapter,
      verseStart,
      verseEnd,
    };
  }
}
