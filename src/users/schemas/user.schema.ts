import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true, index: { unique: true } })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    isSubscribed?: boolean;

    @Prop({ enum: ['100', '500', '1000'] })
    numberOfProfiles?: string
}

export const UserSchema = SchemaFactory.createForClass(User);


UserSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        this['password'] = await bcrypt.hash(this['password'], 10);

        return next();
    } catch (err) {
        return next(err);
    }
});
