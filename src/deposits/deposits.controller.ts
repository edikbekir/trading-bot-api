import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { Get, Post, Body, Param } from '@nestjs/common';
import { CreateDepositDto } from './dto/create-deposit.dto';

@ApiTags('Deposits')
@Controller('deposits')
export class DepositsController {
  constructor(private readonly depositsService: DepositsService) {}

  @Post('/')
  async create(@Body() depositDto: CreateDepositDto) {
    const deposit = await this.depositsService.create(depositDto);
    return { ...deposit };
  }

  // Bad approach, but I need to do it quickly

  @Get('/reviseStatuses/:userId')
  async reviseStatuses(@Param('userId') userId: string) {
    await this.depositsService.reviseStatuses(userId);
  }
}
