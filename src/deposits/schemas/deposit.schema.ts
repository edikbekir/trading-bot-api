import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ id: true })
export class Deposit {
  id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  endDate: Date;

  @Prop()
  total!: string;

  @Prop()
  income: string;

  @Prop()
  amount: string;

  @Prop()
  period: string;

  @Prop()
  status: string;
}

export const DepositSchema = SchemaFactory.createForClass(Deposit);
export type DepositDocument = Deposit & Document;
