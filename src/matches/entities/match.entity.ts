import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MatchDocument = Match & Document;

@Schema()
export class Match extends Document {
  @Prop()
  home_team: string;

  @Prop()
  away_team: string;

  @Prop()
  home_team_goals: number;

  @Prop()
  away_team_goals: number;

  @Prop({type: Date})
  date: Date;
}

export const MatchSchema = SchemaFactory.createForClass(Match).index({home_team: 1, away_team: 1}, {unique: 1});
