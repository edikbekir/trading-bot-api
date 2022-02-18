import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    id: string;

    @Prop({ unique: true })
    username!: string;

    @Prop({ unique: true })
    email!: string;

    @Prop()
    password!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('id', function () {
    return this._id.toHexString();
});

UserSchema.pre('save', async function (next) {
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

export type UserDocument = User & Document;
