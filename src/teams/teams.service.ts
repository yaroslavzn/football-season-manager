import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Team, TeamDocument } from './entities/team.entity';
import { Model } from 'mongoose';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private teamModel: Model<TeamDocument>
  ) {}

  async findOne(id: string): Promise<TeamDocument> {
    const team = await this.teamModel.findById(id).exec();

    if (!team) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }

    return team;
  }

  findMany(name?: string): Promise<TeamDocument[]> {
    const query = this.teamModel.find();

    if (name) {
      query.where('name', new RegExp(name, 'i'));
    }

    return query.exec();
  }

  create(createTeamDto: CreateTeamDto): Promise<TeamDocument> {
    const team = new this.teamModel(createTeamDto);
    return team.save();
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<TeamDocument> {
    const team = await this.teamModel.findByIdAndUpdate(id, {$set: updateTeamDto}, {new: true});

    if (!team) {
      throw new NotFoundException(`Team with id ${id} not found`);
    }

    return team;
  }

  async delete(id: string): Promise<TeamDocument> {
    const team = await this.findOne(id);
    return team.remove();
  }
}
