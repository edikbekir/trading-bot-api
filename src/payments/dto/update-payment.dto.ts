import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePaymentDto {
  @ApiProperty()
  @IsString()
  status!: string;
}
