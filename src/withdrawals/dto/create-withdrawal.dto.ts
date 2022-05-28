import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateWithdrawalDto {
  @ApiProperty()
  @IsString()
  userId!: string;

  @ApiProperty()
  @IsString()
  amount!: string;

  @ApiProperty()
  @IsString()
  wallet!: string;

  @ApiProperty()
  @IsString()
  cryptocurrency!: string;
}
