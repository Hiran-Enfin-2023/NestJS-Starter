import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  private readonly songs = [];
  create(song) {
    this.songs.push(song);
    return this.songs;
  }

  getSongs() {
    return this.songs;
  }
}
