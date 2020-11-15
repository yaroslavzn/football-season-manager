import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TeamDocument } from './entities/team.entity';
import { Types } from 'mongoose';

@Controller('teams')
export class TeamsController {
  constructor(
    private teamsService: TeamsService
  ) {}

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto): Promise<TeamDocument> {
    return await this.teamsService.create(createTeamDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TeamDocument> {
    return await this.teamsService.findOne(id);
  }

  @Get()
  async findMany(): Promise<TeamDocument[]> {
    return await this.teamsService.findMany();
  }

  @Patch(':id')
  async updateOne(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto): Promise<TeamDocument> {
    return await this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<TeamDocument> {
    return await this.teamsService.delete(id);
  }
}
