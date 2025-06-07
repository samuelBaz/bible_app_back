import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BookService } from './services/libro.service';
import { BookRepository } from './repositories/libro.repository';
import { BooksController } from './controller/libro.controller';
import { BibleController } from './controller/biblia.controller';
import { BibleRepository } from './repositories/biblia.repository';
import { BibleService } from './services/biblia.service';
import { CancionController } from './controller/cancion.controller';
import { CancionRepository } from './repositories/cancion.repository';
import { CancionService } from './services/cancion.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
  controllers: [BooksController, BibleController, CancionController],
  providers: [
    BookService,
    BookRepository,
    BibleRepository,
    BibleService,
    CancionRepository,
    CancionService,
  ],
})
export class AppModule {}
