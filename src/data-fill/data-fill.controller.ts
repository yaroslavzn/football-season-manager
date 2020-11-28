import { Controller, Get } from '@nestjs/common';
import { DataFillService } from './data-fill.service';

@Controller('data-fill')
export class DataFillController {
  constructor(
    private dataFillService: DataFillService
  ) {}

  @Get()
  fillData(): Promise<any> {
    return this.dataFillService.fillData();
  }
}
