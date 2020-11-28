import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from './entities/match.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Match.name,
        schema: MatchSchema
      }
    ])
  ],
  controllers: [MatchesController],
  providers: [MatchesService]
})
export class MatchesModule {}
