import { Injectable, Inject } from '@nestjs/common';
import { CancionRepository } from 'src/repositories/cancion.repository';
import { Cancion } from 'src/entities/cancion.entity';

@Injectable()
export class CancionService {
  constructor(
    @Inject(CancionRepository)
    private cancionRepository: CancionRepository,
  ) {}

  private parseQuery(query: string) {
    // Ejemplo de entrada: "VERDE-1"
    const [himnario, numero] = query.split('-');

    if (!himnario || !numero) {
      throw new Error('Formato de query inválido. Debe ser HIMNARIO-NUMERO');
    }

    const numeroCancion = Number(numero);
    if (isNaN(numeroCancion)) {
      throw new Error('El número de canción debe ser un valor numérico');
    }

    return {
      himnario,
      numero: numeroCancion,
    };
  }

  async getByQuery(query: string): Promise<Cancion> {
    const { himnario, numero } = this.parseQuery(query);
    console.log('Buscando canción:', { himnario, numero });

    const cancion = await this.cancionRepository.findByHimnarioAndNumber(
      himnario,
      numero,
    );
    if (!cancion) {
      throw new Error('Canción no encontrada');
    }

    return cancion;
  }

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
