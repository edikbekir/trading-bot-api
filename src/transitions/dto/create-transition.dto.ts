import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTransitionDto {
  @ApiProperty()
  @IsString()
  referredBy!: string;
}
