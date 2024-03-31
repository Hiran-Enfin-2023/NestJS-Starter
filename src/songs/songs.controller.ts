import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDTO } from './dto/create-song-dto';
import { Song } from './entities/song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song-dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ArtistJwtGuard } from 'src/auth/guard/artists-jwt-guard';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}
  @Post()
  @UseGuards(ArtistJwtGuard)
  createSong(@Body() createSongDTO: CreateSongDTO): Promise<Song> {
    return this.songsService.create(createSongDTO);
  }
  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<Song>> {
    limit = limit > 100 ? 100 : limit;
    return this.songsService.paginate({
      page,
      limit,
    });
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
