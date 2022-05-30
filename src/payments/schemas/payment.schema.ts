import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ id: true })
export class Payment {
  id: string;

  @Prop()
  amount: string;

  @Prop()
  createdAt: Date;

  @Prop({ unique: true })
  orderId: string;

  @Prop({ unique: true })
  uniqPaymentId: string;

  @Prop()
  updatedAt: Date;

  @Prop()
  currency: string;

  @Prop()
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
export type PaymentDocument = Payment & Document;
