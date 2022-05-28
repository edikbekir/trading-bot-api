import { ApiProperty } from '@nestjs/swagger';
import { Deposit } from 'src/deposits/schemas/deposit.schema';
import { Payment } from 'src/payments/schemas/payment.schema';
import { Referral } from 'src/referrals/schemas/referral.schema';
import { Transition } from 'src/transitions/schemas/transition.schema';

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
  deposits: Deposit[];

  @ApiProperty()
  transitions: Transition[];

  @ApiProperty()
  referredBy: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  balance: string;
}
