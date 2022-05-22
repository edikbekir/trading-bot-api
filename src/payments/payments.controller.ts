import { ApiTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @Post('/')
  async create(@Body() paymentDto: CreatePaymentDto) {
    const payment = await this.paymentService.create(paymentDto);
    return { ...payment };
  }
}
