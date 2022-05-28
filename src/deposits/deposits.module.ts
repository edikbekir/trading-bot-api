import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepositsService } from './deposits.service';
import { DepositsController } from './deposits.controller';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Deposit, DepositSchema } from './schemas/deposit.schema';

@Module({
  controllers: [DepositsController],
  providers: [DepositsService],
  imports: [
    MongooseModule.forFeature([{ name: Deposit.name, schema: DepositSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class DepositsModule {}
