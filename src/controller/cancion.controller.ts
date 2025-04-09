import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CancionService } from 'src/services/cancion.service';
import { Cancion } from 'src/entities/cancion.entity';

@Controller('canciones')
export class CancionController {
  constructor(private readonly cancionService: CancionService) {}

  @Get()
  async getAll(): Promise<Cancion[]> {
    return this.cancionService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Cancion> {
    return this.cancionService.getById(id);
  }

  @Post()
  async create(@Body() cancion: Cancion): Promise<Cancion> {
    return this.cancionService.create(cancion);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() cancion: Partial<Cancion>,
  ): Promise<Cancion> {
    return this.cancionService.update(id, cancion);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.cancionService.delete(id);
  }
}
