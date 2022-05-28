import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ id: true })
export class Withdrawal {
  id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  wallet!: string;

  @Prop()
  amount!: string;

  @Prop()
  status: string;

  @Prop()
  cryptocurrency: string;
}

export const WithdrawalSchema = SchemaFactory.createForClass(Withdrawal);
export type WithdrawalDocument = Withdrawal & Document;
