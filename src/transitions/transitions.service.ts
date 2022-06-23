import { Injectable } from '@nestjs/common';
import { CreateTransitionDto } from './dto/create-transition.dto';
import { TransitionDto } from './dto/transition.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Transition,
  TransitionDocument,
} from 'src/transitions/schemas/Transition.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class TransitionsService {
  constructor(
    @InjectModel(Transition.name)
    private transitionModel: Model<TransitionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(
    createTransitionDto: CreateTransitionDto,
  ): Promise<TransitionDto> {
    const { referredBy } = createTransitionDto;
    const user = await this.userModel.findOne({ username: referredBy });
    const createTransition = new this.transitionModel({
      ...createTransitionDto,
      userId: user.id,
      createdAt: new Date(),
    });

    await createTransition.save();

    await this.userModel.findOneAndUpdate(
      { username: referredBy },
      { $push: { transitions: createTransition } },
    );

    const { id, createdAt, userId } = createTransition;

    return { id, createdAt, referredBy, userId };
  }
}
