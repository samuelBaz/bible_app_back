import { Injectable, Inject } from '@nestjs/common';
import { CancionRepository } from 'src/repositories/cancion.repository';
import { Cancion } from 'src/entities/cancion.entity';

@Injectable()
export class CancionService {
  constructor(
    @Inject(CancionRepository)
    private cancionRepository: CancionRepository,
  ) {}

  async getAll(): Promise<Cancion[]> {
    return this.cancionRepository.getAll();
  }

  async getById(id: number): Promise<Cancion> {
    return this.cancionRepository.findById(id);
  }

  async create(cancion: Cancion): Promise<Cancion> {
    return this.cancionRepository.create(cancion);
  }

  async update(id: number, cancion: Partial<Cancion>): Promise<Cancion> {
    return this.cancionRepository.update(id, cancion);
  }

  async delete(id: number): Promise<void> {
    return this.cancionRepository.delete(id);
  }
}
