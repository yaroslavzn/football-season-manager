import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
  @Prop()
  name: string;
}

export const TeamSchema =  SchemaFactory.createForClass(Team);
