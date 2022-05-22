import { ApiProperty } from '@nestjs/swagger';
import { Payment } from 'src/payments/schemas/payment.schema';
export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  payments: Payment[];
}
