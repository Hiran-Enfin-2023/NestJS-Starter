import { ArtistController } from './artist/artist.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
// import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
// import { SongsController } from './songs/songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/entities/song.entity';
import { ArtistModule } from './artist/artist.module';
import { UserModule } from './user/user.module';
import { Artist } from './artist/entities/artist.entity';
import { User } from './user/entities/user.entity';
import { PlaylistModule } from './playlist/playlist.module';
import { Playlist } from './playlist/entities/playlist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'SpotifyClone',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'enfin123',
      entities: [Song, Artist, User, Playlist],
      synchronize: true,
    }),
    SongsModule,
    ArtistModule,
    UserModule,
    PlaylistModule,
  ],
  controllers: [ArtistController, AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
    console.log('dbName', dataSource.driver.database);
  }
  // configure(consumer: MiddlewareConsumer) {
  //   // consumer
  //   //   .apply(LoggerMiddleware)
  //   //   .forRoutes({ path: 'songs', method: RequestMethod.POST });

  //   consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  // }
}
