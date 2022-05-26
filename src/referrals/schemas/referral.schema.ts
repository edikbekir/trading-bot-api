import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ id: true })
export class Referral {
  id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  name: string;

  @Prop()
  amount: string;

  @Prop()
  reward: string;
}

export const ReferralSchema = SchemaFactory.createForClass(Referral);
export type ReferralDocument = Referral & Document;
