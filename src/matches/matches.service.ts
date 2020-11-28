import { Body, Delete, Get, Injectable, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Match, MatchDocument } from './entities/match.entity';
import { Model } from 'mongoose';

@Injectable()
export class MatchesService {
  constructor(
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>
  ) {}

  find(date?: string, teams?: string[]): Promise<MatchDocument[]> {
    const query = this.matchModel.find();

    if (teams) {
      query.or([
        {home_team: {
          $in: teams
        }},
        {
          away_team: {
            $in: teams
          }
        }
      ])
    }

    if (date) {
      query.where('date', date);
    }

    return query.exec();
  }

  async findOne(id: string): Promise<MatchDocument> {
    const match = await this.matchModel.findById(id).exec();

    if (!match) {
      throw new NotFoundException(`Match with id ${id} not found`);
    }

    return match;
  }

  create(createMatchDto: CreateMatchDto): Promise<MatchDocument> {
    const match = new this.matchModel({
      ...createMatchDto
    });

    return match.save();
  }

  async update(id: string, updateMatchDto: UpdateMatchDto): Promise<MatchDocument> {
    const match = await this.matchModel.findByIdAndUpdate(id, {
      $set: updateMatchDto
    }, {new: true, useFindAndModify: true}).exec();

    if (!match) {
      throw new NotFoundException(`Match with id ${id} not found`);
    }

    return match;
  }

  async remove(id: string): Promise<MatchDocument> {
    const match = await this.findOne(id);

    return match.remove();
  }
}
