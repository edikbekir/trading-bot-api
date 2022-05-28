import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WithdrawalsService } from './withdrawals.service';
import { WithdrawalsController } from './withdrawals.controller';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { Withdrawal, WithdrawalSchema } from './schemas/withdrawal.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [WithdrawalsController],
  providers: [WithdrawalsService],
  imports: [
    MongooseModule.forFeature([
      { name: Withdrawal.name, schema: WithdrawalSchema },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    HttpModule,
  ],
})
export class WithdrawalsModule {}
