import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Prop } from '@nestjs/mongoose';

export class CreateDepositDto {
  @ApiProperty()
  @IsString()
  userId!: string;

  @ApiProperty()
  @IsString()
  amount!: string;

  @ApiProperty()
  @IsString()
  depositType!: string;
}

export class BuildDepositDto {
  @Prop()
  id!: number;

  @Prop()
  title!: string;

  @Prop()
  info!: string[];

  @Prop()
  interestRate!: number;

  @Prop()
  capitalisation!: boolean;

  @Prop()
  fee!: number;

  @Prop()
  periods!: number;

  @Prop()
  amount!: number;
}
