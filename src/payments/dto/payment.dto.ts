import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  currency!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  total!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  servicePaymentId!: string;

  @ApiProperty()
  updatedAt!: Date;
}
