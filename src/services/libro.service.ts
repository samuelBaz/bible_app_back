import { Inject, Injectable } from '@nestjs/common';
import { BookRepository } from 'src/repositories/libro.repository';

@Injectable()
export class BookService {
  constructor(
    @Inject(BookRepository)
    private bookRepository: BookRepository,
  ) {}

  getAll() {
    return this.bookRepository.getAll();
  }
}
