import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { Payment } from 'src/payments/schemas/payment.schema';
import { Referral } from 'src/referrals/schemas/referral.schema';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transition } from 'src/transitions/schemas/transition.schema';
import { Deposit } from 'src/deposits/schemas/deposit.schema';
import { Withdrawal } from 'src/withdrawals/schemas/withdrawal.schema';
@Schema({ id: true })
export class User {
  id: string;

  @Prop({ unique: true })
  username!: string;

  @Prop({ unique: true })
  email!: string;

  @Prop()
  password!: string;

  @Prop()
  referredBy: string;

  @Prop()
  createdAt: Date;

  @Prop({ type: [Types.ObjectId], ref: Payment.name })
  payments: Payment[];

  @Prop({ type: [Types.ObjectId], ref: Transition.name })
  transitions: Transition[];

  @Prop({ type: [Types.ObjectId], ref: Referral.name })
  referrals: Referral[];

  @Prop({ type: [Types.ObjectId], ref: Deposit.name })
  deposits: Deposit[];

  @Prop({ type: [Types.ObjectId], ref: Withdrawal.name })
  withdrawals: Withdrawal[];

  @Prop()
  balance!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    this['password'] = await bcrypt.hash(this['password'], 10);

    return next();
  } catch (err) {
    return next(err);
  }
});

export type UserDocument = User & Document;
