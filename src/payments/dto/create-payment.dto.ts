import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty()
  @IsString()
  amount!: string;

  @ApiProperty()
  @IsString()
  currency!: string;

  @ApiProperty()
  @IsString()
  status!: string;

  @ApiProperty()
  @IsString()
  userId!: string;

  @ApiProperty()
  @IsString()
  orderId!: string;
}
