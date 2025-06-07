import { Injectable } from '@nestjs/common';
import { Cancion } from 'src/entities/cancion.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CancionRepository {
  constructor(private dataSource: DataSource) {}

  async getAll(): Promise<Cancion[]> {
    return this.dataSource.getRepository(Cancion).find({
      relations: ['estrofas'],
    });
  }

  async findById(id: number): Promise<Cancion> {
    return this.dataSource.getRepository(Cancion).findOne({
      where: { id },
      relations: ['estrofas'],
    });
  }

  async findByHimnarioAndNumber(
    himnario: string,
    numero: number,
  ): Promise<Cancion> {
    return this.dataSource.getRepository(Cancion).findOne({
      where: {
        himnario,
        numero,
      },
      relations: ['estrofas'],
    });
  }

  async create(cancion: Cancion): Promise<Cancion> {
    return this.dataSource.getRepository(Cancion).save(cancion);
  }

  async update(id: number, cancion: Partial<Cancion>): Promise<Cancion> {
    await this.dataSource.getRepository(Cancion).update(id, cancion);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.dataSource.getRepository(Cancion).delete(id);
  }
}
