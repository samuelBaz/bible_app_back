import { Controller, Get, Query } from '@nestjs/common';
import { Bible } from 'src/entities/biblia.entity';
import { BibleService } from 'src/services/biblia.service';

@Controller('bibles')
export class BibleController {
  constructor(private readonly bibleService: BibleService) {}

  @Get('verses')
  async getVerses(@Query('query') query: string): Promise<Bible[]> {
    return await this.bibleService.getVerses(query);
  }

  // @Get('verses')
  // async getVerses1(@Query('query') query: string): Promise<string> {
  //   console.log(query);

  //   return await 'Hola Mundo';
  // }
}
