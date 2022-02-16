import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class TwoFA {
    @Prop({type: Types.ObjectId})
    profile_id: Types.ObjectId;

    @Prop()
    mnemonic!: string;

    @Prop({ default: false })
    isUsed?: boolean;
}

export type TwoFADocument = TwoFA & Document;
export const TwoFASchema = SchemaFactory.createForClass(TwoFA);
