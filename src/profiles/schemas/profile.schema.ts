import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Cookie } from './cookie.schema';
import { Proxy } from './proxy.schema';
import { TwoFA } from './2FA.schema';

@Schema({ _id: false })
class Credentials extends Document {
	@Prop({ required: true })
	username: string;

	@Prop({ required: true })
	password: string;
}

@Schema({ id: true })
export class Profile {
	id: string;

	@Prop({ unique: true })
	name!: string;

	@Prop({ type: Credentials })
	credentials!: Credentials;

	@Prop({ type: Cookie })
	cookie!: Cookie;

	@Prop({ type: Proxy })
	proxy!: Proxy;

	@Prop({ type: TwoFA })
	twoFA: TwoFA;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

export type ProfileDocument = Profile & Document;
