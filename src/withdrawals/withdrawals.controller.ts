import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { Get, Post, Body } from '@nestjs/common';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';

@ApiTags('Withdrawals')
@Controller('withdrawals')
export class WithdrawalsController {
  constructor(private readonly withdrawalService: WithdrawalsService) {}

  @Post('/')
  async create(@Body() withdrawalDto: CreateWithdrawalDto) {
    const withdrawal = await this.withdrawalService.create(withdrawalDto);
    return withdrawal;
  }

  @Get()
  findAll() {
    return this.withdrawalService.findAll();
  }

  @Get('/currencies')
  async getCurrencies() {
    return await this.withdrawalService.getCurrencies();
  }
}
