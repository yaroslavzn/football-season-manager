import { Module } from '@nestjs/common';
import { TeamsModule } from './teams/teams.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchesModule } from './matches/matches.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TeamsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      })
    }),
    MatchesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
