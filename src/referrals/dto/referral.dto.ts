import { ApiProperty } from '@nestjs/swagger';

export class ReferralDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  amount!: string;

  @ApiProperty()
  reward!: string;
}
