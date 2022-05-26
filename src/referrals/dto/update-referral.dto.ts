import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateReferralDto {
  @ApiProperty()
  @IsString()
  status!: string;
}
