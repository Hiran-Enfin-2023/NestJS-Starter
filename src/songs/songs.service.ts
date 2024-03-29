import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Song } from './entities/song.entity';
import { CreateSongDTO } from './dto/create-song-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateSongDTO } from './dto/update-song-dto';

// @Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}

  create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.releasedDate = songDTO.releaseDate;
    song.duration = songDTO.duration;
    song.lyrics = songDTO?.lyrics;

    return this.songsRepository.save(song);
  }

  getSongs(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  getSingleSong(id: number): Promise<Song> {
    try {
      const song = this.songsRepository.findOneBy({ id });

      if (song) {
        return song;
      } else {
        throw new HttpException('Server Error', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException('Server Error', HttpStatus.NOT_FOUND, {
        cause: error,
      });
    }
  }

  removeSong(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete(id);
  }

  updateSong(id: number, recordToUpdate: UpdateSongDTO): Promise<UpdateResult> {
    return this.songsRepository.update(id, recordToUpdate);
  }
}
