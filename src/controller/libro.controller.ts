import { Controller, Get } from '@nestjs/common';
import { Book } from 'src/entities/libro.entity';
import { BookService } from 'src/services/libro.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BookService) {}

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.getAll();
  }
}
