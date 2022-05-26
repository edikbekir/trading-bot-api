import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateInvoiceDto {
  @ApiProperty()
  @IsString()
  amount!: string;

  @ApiProperty()
  @IsString()
  currency!: string;

  @ApiProperty()
  @IsString()
  orderId!: string;

  @ApiProperty()
  @IsString()
  userId!: string;
}
