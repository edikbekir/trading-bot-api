import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Proxy {
    @Prop({ type: Types.ObjectId })
    profile_id: Types.ObjectId;

    @Prop()
    name!: string;

    @Prop()
    user!: string

    @Prop()
    password!: string;

    @Prop()
    domain!: string;

    @Prop()
    port!: string;
}

export type ProxyDocument = Proxy & Document;
export const ProxySchema = SchemaFactory.createForClass(Proxy);
