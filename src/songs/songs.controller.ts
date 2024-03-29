import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Song } from './entities/song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post()
  createSong(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    return this.songsService.create(createSongDTO);
  }
  @Get()
  findAll() {
    try {
      return this.songsService.getSongs();
    } catch (error) {
      throw new HttpException(
        'Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  @Get(':id')
  getSingleSong(@Param('id', ParseIntPipe) id: number): Promise<Song> {
    return this.songsService.getSingleSong(id);
  }

  @Delete(':id')
  removeSong(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songsService.removeSong(id);
  }

  @Put(':id')
  updateSong(
    @Param('id', ParseIntPipe) id: number,
    @Body() recordToUpdate: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songsService.updateSong(id, recordToUpdate);
  }
}
