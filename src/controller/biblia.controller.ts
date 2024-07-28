import { Controller, Get, Query } from '@nestjs/common';
import { Bible } from 'src/entities/biblia.entity';
import { BibleService } from 'src/services/biblia.service';

@Controller('bibles')
export class BibleController {
  constructor(private readonly bibleService: BibleService) {}

  @Get('verses')
  async getVerses(@Query('query') query: string): Promise<Bible[]> {
    return this.bibleService.getVerses(query);
  }
}
