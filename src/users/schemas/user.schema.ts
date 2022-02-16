import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Profile } from '../../profiles/schemas/profile.schema';
import * as mongoose from 'mongoose';

@Schema()
export class User {
    @Prop({ unique: true })
    username!: string;

    @Prop({ unique: true })
    email!: string;

    @Prop()
    password!: string;

    @Prop({ default: false })
    isSubscribed?: boolean;

    @Prop({ enum: ['100', '500', '1000'], default: '100' })
    numberOfProfiles?: string

    /* TODO: makes sense to do it separately */
    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }] })
    // profiles?: Profile[]
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

export type UserDocument = User & Document;
