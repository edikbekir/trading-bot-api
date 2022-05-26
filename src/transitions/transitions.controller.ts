import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { TransitionsService } from './transitions.service';
import { CreateTransitionDto } from './dto/create-transition.dto';

@ApiTags('Transitions')
@Controller('transitions')
export class TransitionsController {
  constructor(private transitionService: TransitionsService) {}

  @Post('/')
  async create(@Body() referralDto: CreateTransitionDto) {
    const transition = await this.transitionService.create(referralDto);
    return { ...transition };
  }
}
