import { ApiProperty } from '@nestjs/swagger';

export class WithdrawalDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  wallet!: string;

  @ApiProperty()
  amount!: string;

  @ApiProperty()
  status: string;
}
