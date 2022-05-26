import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transition, TransitionSchema } from './schemas/transition.schema';
import { TransitionsController } from './transitions.controller';
import { TransitionsService } from './transitions.service';
import { UserSchema, User } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Transition.name,
        schema: TransitionSchema,
      },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [TransitionsController],
  providers: [TransitionsService],
})
export class TransitionModule {}
