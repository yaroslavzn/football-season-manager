import { HttpModule, Module } from '@nestjs/common';
import { MatchesModule } from '../matches/matches.module';
import { TeamsModule } from '../teams/teams.module';
import { DataFillController } from './data-fill.controller';
import { DataFillService } from './data-fill.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from '../teams/entities/team.entity';
import { Match, MatchSchema } from '../matches/entities/match.entity';

@Module({
  imports: [
    MatchesModule,
    TeamsModule,
    HttpModule,
    MongooseModule.forFeature([
      {
        name: Team.name,
        schema: TeamSchema
      },
      {
        name: Match.name,
        schema: MatchSchema
      }
    ])
  ],
  providers: [DataFillService],
  controllers: [DataFillController]
})
export class DataFillModule {}
