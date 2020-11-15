import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  home_team: string;

  @IsString()
  away_team: string;

  @IsString()
  @IsOptional()
  win_team: string;

  @IsString()
  @IsOptional()
  lose_team: string;

  @IsBoolean()
  is_draw: boolean;

  @IsString()
  date: string;

  @IsNumber()
  @IsPositive()
  home_team_goals: number;

  @IsNumber()
  @IsPositive()
  away_team_goals: number;
}
