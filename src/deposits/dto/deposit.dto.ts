import { ApiProperty } from '@nestjs/swagger';

export class DepositDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  endDate!: Date;

  @ApiProperty()
  amount!: string;

  @ApiProperty()
  income: string;

  @ApiProperty()
  period: string;

  @ApiProperty()
  status: string;
}
