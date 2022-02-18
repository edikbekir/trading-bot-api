import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ _id: false })
export class Proxy {
	@Prop()
	name!: string;

	@Prop()
	user!: string;

	@Prop()
	password!: string;

	@Prop()
	domain!: string;

	@Prop()
	port!: number;
}

export const ProxySchema = SchemaFactory.createForClass(Proxy);

export type ProxyDocument = Proxy & Document;
