import { Injectable } from '@nestjs/common';
import { CreateReferralDto } from './dto/create-referral.dto';
import { ReferralDto } from './dto/referral.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Referral,
  ReferralDocument,
} from '../Referrals/schemas/Referral.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Types } from 'mongoose';
import { UpdateReferralDto } from './dto/update-referral.dto';

@Injectable()
export class ReferralsService {
  constructor(
    @InjectModel(Referral.name) private referralModel: Model<ReferralDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findOne(id: string): Promise<ReferralDto> {
    return await this.referralModel
      .findOne({
        _id: new Types.ObjectId(id),
      })
      .exec();
  }

  async update(id: string, updateReferralDto: UpdateReferralDto) {
    await this.referralModel
      .updateOne(
        {
          _id: new Types.ObjectId(id),
        },
        updateReferralDto,
      )
      .exec();

    return await this.findOne(id);
  }

  async create(createReferralDto: CreateReferralDto): Promise<ReferralDto> {
    const { userId } = createReferralDto;
    const createReferral = new this.referralModel({
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createReferralDto,
    });
    await createReferral.save();

    await this.userModel.findOneAndUpdate(
      { _id: new Types.ObjectId(userId) },
      { $push: { referrals: createReferral } },
    );

    const { id, name, createdAt, reward, amount } = createReferral;

    return {
      id,
      name,
      createdAt,
      reward,
      amount,
    };
  }
}
