import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(
    private teamsService: TeamsService
  ) {}

  @Post()
  create(): any {}

  @Get(':id')
  findOne(): any {}

  @Get()
  findMany(): any {}

  @Patch(':id')
  updateOne(): any {}

  @Delete(':id')
  deleteOne(): any {}
}
