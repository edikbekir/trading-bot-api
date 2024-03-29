import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  currency!: string;

  @ApiProperty()
  status!: string;

  @ApiProperty()
  amount!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  orderId!: string;

  @ApiProperty()
  updatedAt!: Date;
}
