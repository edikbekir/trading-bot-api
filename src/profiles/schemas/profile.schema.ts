import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// import { Credentials as ICredentials } from '../interfaces/credentials.interface';
// import { Cookie as ICookie } from '../interfaces/cookies.interface';
// import { Proxy as IProxy } from '../interfaces/proxies.interface';
// import { TwoFA as ITwoFA } from '../interfaces/two-FA.interface';

import { Cookie } from './cookie.schema';
import { Proxy } from './proxy.schema';
import { TwoFA } from './2FA.schema';

@Schema()
class Credentials extends Document {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;
}

@Schema()
export class Profile {
    @Prop({ type: Types.ObjectId })
    _id: Types.ObjectId;

    @Prop({ required: true })
    name!: string;

    @Prop({ type: Credentials })
    credentials!: Credentials

    @Prop({ type: Cookie })
    cookie!: Cookie;

    @Prop({ type: Proxy })
    proxy!: Proxy;

    @Prop({ type: TwoFA })
    twoFA: TwoFA;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
export type ProfileDocument = Profile & Document;
