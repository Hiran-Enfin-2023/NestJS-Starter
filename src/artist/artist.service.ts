import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';

export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  findArtist(userId: number): Promise<Artist> {
    return this.artistRepository.findOneBy({ user: { id: userId } });
  }
}
