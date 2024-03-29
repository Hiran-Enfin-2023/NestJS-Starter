import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post()
  createSong(@Body() createSongDTO: CreateSongDTO) {
    return this.songsService.create(createSongDTO);
  }
  @Get()
  findAll() {
    return this.songsService.getSongs();
  }

  @Get(':id')
  findOne() {
    return 'fetch song bases on id';
  }

  @Put(':id')
  update() {
    return 'update song bases on id';
  }

  @Delete(':id')
  delete() {
    return 'delete song based on id';
  }
}
