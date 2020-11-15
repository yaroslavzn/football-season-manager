import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamSchema } from './entities/team.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Team.name,
        schema: TeamSchema
      }
    ])
  ],
  controllers: [
    TeamsController
  ],
  providers: [TeamsService]
})
export class TeamsModule {}
