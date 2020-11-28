import { HttpService, Injectable } from '@nestjs/common';
import { map, tap } from 'rxjs/operators';
import { InjectModel } from '@nestjs/mongoose';
import { Team, TeamDocument } from '../teams/entities/team.entity';
import { Model } from 'mongoose';
import { CreateTeamDto } from '../teams/dto/create-team.dto';
import { CreateMatchDto } from '../matches/dto/create-match.dto';
import { Match, MatchDocument } from '../matches/entities/match.entity';

@Injectable()
export class DataFillService {
  constructor(
    private httpService: HttpService,
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>,
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>
  ) {}

  teamsRaw: CreateTeamDto[];
  matchesRaw: CreateMatchDto[];
  teams: TeamDocument[];
  matches: MatchDocument[];

  async fillData(): Promise<any> {
    this.teams = await this.teamModel.find().exec();
    this.matchesRaw = await this.httpService.get('https://api.jsonbin.io/b/5ebb0cf58284f36af7ba1779/1')
      .pipe(
        map(data => data.data.map(item => {
          return {
            home_team: item.HomeTeam,
            away_team: item.AwayTeam,
            date: item.Date,
            home_team_goals: item.FTHG,
            away_team_goals: item.FTAG
          }
        })),
        tap((data) => {
          this.teamsRaw = this.getUniqueTeams(data, this.teams);
        })
      )
      .toPromise();

    await this.teamModel.insertMany(this.teamsRaw);
    this.teams = await this.teamModel.find().exec();

    this.matches = await this.matchModel.find().exec();
    this.matchesRaw = this.getUniqueMatches(this.matchesRaw, this.matches);
    await this.matchModel.insertMany(this.matchesRaw);

    return;
  }

  private getUniqueTeams(data: any[], existingTeams: any[]): CreateTeamDto[] {
    const teams: Set<string> = new Set<string>();
    data.forEach(item => {
      teams.add(item.home_team);
      teams.add(item.away_team);
    });

    return Array.from(teams).map(item => ({name: item})).filter(item => existingTeams.findIndex(team => team.name === item.name) === -1);
  }

  private getUniqueMatches(data: CreateMatchDto[], existingMatches: any[]): CreateMatchDto[] {
    return data.map(match => {
      const homeTeamId = this.teams.find(team => team.name === match.home_team);
      const awayTeamId = this.teams.find(team => team.name === match.away_team);

      return {
        ...match,
        home_team: (homeTeamId && homeTeamId.id) || null,
        away_team: (awayTeamId && awayTeamId.id) || null,
        date: new Date((match.date.toString()).split('/').reverse().join('-'))
      }
    })
      .filter(match => {
        const matchIndex = existingMatches.findIndex(item => item.home_team === match.home_team &&
          item.away_team === match.away_team);

        return matchIndex === -1;
      })
  }
}
