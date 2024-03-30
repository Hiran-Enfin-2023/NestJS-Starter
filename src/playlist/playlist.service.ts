import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { Playlist } from './entities/playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from 'src/songs/entities/song.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playListRepository: Repository<Playlist>,

    @InjectRepository(Song)
    private songRepository: Repository<Song>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createPlaylistDto: CreatePlaylistDto): Promise<Playlist> {
    const playList = new Playlist();
    playList.name = createPlaylistDto.name;

    const songs = await this.songRepository.findByIds(createPlaylistDto.songs);

    playList.songs = songs;

    const user = await this.userRepository.findOneBy({
      id: createPlaylistDto.user,
    });
    playList.user = user;

    return this.playListRepository.save(playList);
  }

  findAll() {
    return `This action returns all playlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playlist`;
  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} playlist`;
  }
}
