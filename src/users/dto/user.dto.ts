import { ApiProperty } from '@nestjs/swagger';
import { Payment } from 'src/payments/schemas/payment.schema';
import { Referral } from 'src/referrals/schemas/referral.schema';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  payments: Payment[];

  @ApiProperty()
  referrals: Referral[];

  @ApiProperty()
  referredBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  balance: string;
}
