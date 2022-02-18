import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class TwoFA {
	@Prop()
	mnemonic!: string;

	@Prop({ default: false })
	isUsed?: boolean;
}

export const TwoFASchema = SchemaFactory.createForClass(TwoFA);

export type TwoFADocument = TwoFA & Document;
