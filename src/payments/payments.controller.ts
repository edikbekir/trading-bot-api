import { ApiTags } from '@nestjs/swagger';
import { Get, Param, Patch, Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentDto } from './dto/payment.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private paymentService: PaymentsService) {}

  @Post('/')
  async create(@Body() paymentDto: CreatePaymentDto) {
    const payment = await this.paymentService.create(paymentDto);
    return { ...payment };
  }

  @Post('/invoice')
  async createInvoice(@Body() invoiceDto: CreateInvoiceDto) {
    const invoice = await this.paymentService.createInvoice(invoiceDto);
    return { ...invoice };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PaymentDto> {
    return this.paymentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<PaymentDto> {
    return await this.paymentService.update(id, updatePaymentDto);
  }
}
