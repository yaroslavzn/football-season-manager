import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchesService } from './matches.service';
import { MatchDocument } from './entities/match.entity';

@Controller('matches')
export class MatchesController {
  constructor(
    private matchesService: MatchesService
  ) {}

  @Get()
  find(
    @Query('date') date?: string,
    @Query('teams', new ParseArrayPipe({separator: ';', optional: true})) teams?: string[]): Promise<MatchDocument[]> {
    return this.matchesService.find(date, teams);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<MatchDocument> {
    return await this.matchesService.findOne(id);
  }

  @Post()
  create(@Body() createMatchDto: CreateMatchDto): Promise<MatchDocument> {
    return this.matchesService.create(createMatchDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto): Promise<MatchDocument> {
    return await this.matchesService.update(id, updateMatchDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<MatchDocument> {
    return await this.matchesService.remove(id);
  }
}
