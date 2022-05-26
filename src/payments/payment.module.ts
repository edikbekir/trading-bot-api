import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schemas/payment.schema';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { UserSchema, User } from 'src/users/schemas/user.schema';
import { HttpModule } from '@nestjs/axios';
import {
  Referral,
  ReferralSchema,
} from 'src/referrals/schemas/referral.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Referral.name, schema: ReferralSchema },
    ]),
    HttpModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
