import { IsDate, IsNumber, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMatchDto {
  @IsString()
  home_team: string;

  @IsString()
  away_team: string;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsNumber()
  @Min(0)
  home_team_goals: number;

  @IsNumber()
  @Min(0)
  away_team_goals: number;
}
