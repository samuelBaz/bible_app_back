import { Injectable } from '@nestjs/common';
import { Book } from 'src/entities/libro.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class BookRepository {
  constructor(private dataSource: DataSource) {}

  async getAll(): Promise<Book[]> {
    const query = this.dataSource.getRepository(Book).find();

    return query;
  }

  async findByAbbreviation(abbreviation: string): Promise<Book> {
    return this.dataSource
      .getRepository(Book)
      .createQueryBuilder('book')
      .where('book.abreviation = :abbreviation', { abbreviation })
      .getOne();
  }
}
