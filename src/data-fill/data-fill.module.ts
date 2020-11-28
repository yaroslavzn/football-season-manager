import { Module } from '@nestjs/common';
import { MatchesModule } from '../matches/matches.module';
import { TeamsModule } from '../teams/teams.module';

@Module({
  imports: [
    MatchesModule,
    TeamsModule
  ],
  providers: [],
  controllers: []
})
export class DataFillModule {}
