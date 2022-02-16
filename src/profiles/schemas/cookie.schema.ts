import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Cookie {
    @Prop({type: Types.ObjectId})
    profile_id: Types.ObjectId;

    @Prop()
    file!: string;
}

export type CookieDocument = Cookie & Document;
export const CookieSchema = SchemaFactory.createForClass(Cookie);
