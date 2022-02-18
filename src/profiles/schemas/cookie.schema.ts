import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Cookie {
	@Prop()
	file!: string;
}

export const CookieSchema = SchemaFactory.createForClass(Cookie);

export type CookieDocument = Cookie & Document;
