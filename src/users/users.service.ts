import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { Types } from 'mongoose';
import {
  Referral,
  ReferralDocument,
} from 'src/referrals/schemas/referral.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Referral.name) private referralModel: Model<ReferralDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { email, username, referredBy } = createUserDto;
    const user = await this.query({ email, username });

    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const createdReferral = new this.referralModel({
      createdAt: new Date(),
      name: username,
      amount: '0',
      reward: '0',
    });
    await createdReferral.save();

    if (referredBy) {
      await this.userModel.findOneAndUpdate(
        { username: referredBy },
        {
          $push: {
            referrals: createdReferral,
          },
        },
      );
    }

    const createdUser = new this.userModel({
      ...createUserDto,
      balance: '0',
      createdAt: new Date(),
    });
    await createdUser.save();

    return this.toUserDto(createdUser);
  }

  async findByLogin({ email, password }): Promise<UserDto> {
    const user = await this.query({ email });

    if (!user) {
      throw new HttpException('user does not exists', HttpStatus.BAD_REQUEST);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.toUserDto(user);
    }

    throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
  }

  async findAll(): Promise<UserDto[]> {
    const users: User[] = await this.userModel.find().exec();

    return users.map(this.toUserDto);
  }

  async findOne(id: string): Promise<UserDto> {
    return await this.userModel
      .findOne({ _id: new Types.ObjectId(id) })
      .populate({ path: 'payments', options: { sort: { createdAt: -1 } } })
      .populate({ path: 'referrals', options: { sort: { createdAt: -1 } } })
      .exec()
      .then(this.toUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    await this.userModel.updateOne({ id }, updateUserDto).exec();

    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const { deletedCount } = await this.userModel.deleteOne({ id }).exec();

    return deletedCount === 1;
  }

  async getReferralsByUserName(username: string) {
    const res = await this.userModel
      .findOne({ username: username })
      .populate({ path: 'referrals', options: { sort: { createdAt: -1 } } })
      .exec()
      .then((data) => console.log(data.referrals));
    console.log(res);
  }

  toUserDto(data: User): UserDto {
    const { username, email, id, payments, referredBy, createdAt, referrals } =
      data;

    return { username, email, id, payments, referredBy, createdAt, referrals };
  }

  private query(filter: Partial<User>): Promise<User> {
    return this.userModel.findOne(filter).exec();
  }
}
