import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ id: true })
export class Transition {
  id: string;

  @Prop()
  createdAt: Date;

  @Prop()
  referredBy: string;

  @Prop()
  userId: string;
}

export const TransitionSchema = SchemaFactory.createForClass(Transition);
export type TransitionDocument = Transition & Document;
