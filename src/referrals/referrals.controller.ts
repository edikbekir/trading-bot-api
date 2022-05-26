import { ApiTags } from '@nestjs/swagger';
import { Get, Param, Patch, Controller, Post, Body } from '@nestjs/common';
import { ReferralsService } from './referrals.service';
import { CreateReferralDto } from './dto/create-referral.dto';
import { UpdateReferralDto } from './dto/update-referral.dto';
import { ReferralDto } from './dto/referral.dto';

@ApiTags('Referrals')
@Controller('referrals')
export class ReferralsController {
  constructor(private referralService: ReferralsService) {}

  @Post('/')
  async create(@Body() referralDto: CreateReferralDto) {
    const referral = await this.referralService.create(referralDto);
    return { ...referral };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ReferralDto> {
    return this.referralService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReferralDto: UpdateReferralDto,
  ): Promise<ReferralDto> {
    return await this.referralService.update(id, updateReferralDto);
  }
}
