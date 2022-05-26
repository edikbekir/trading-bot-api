import { ApiProperty } from '@nestjs/swagger';

export class TransitionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  referredBy!: string;

  @ApiProperty()
  userId!: string;
}
