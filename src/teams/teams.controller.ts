import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(
    private teamsService: TeamsService
  ) {}

  @Get(':id')
  findOne(): any {}

  @Get()
  findMany(): any {}

  @Patch(':id')
  updateOne(): any {}

  @Delete(':id')
  deleteOne(): any {}
}
