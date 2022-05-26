import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Types } from 'mongoose';
import { Payment } from '../../payments/schemas/payment.schema';
import { Referral } from '../../referrals/schemas/referral.schema';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

  @Prop({ type: [Types.ObjectId], ref: Referral.name })
  referrals: Referral[];

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
