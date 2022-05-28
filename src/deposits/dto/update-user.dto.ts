import { PartialType } from '@nestjs/mapped-types';
import { CreateDepositDto } from './create-deposit.dto';

export class UpdateUserDto extends PartialType(CreateDepositDto) {}
