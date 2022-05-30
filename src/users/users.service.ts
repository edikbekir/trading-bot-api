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

const TOKEN = 'knRuYV9F7m3Lqe4c';

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

  async findAll(permissionToken: string): Promise<UserDto[]> {
    // if (permissionToken === TOKEN) {
    const users: User[] = await this.userModel
      .find()
      .populate({ path: 'payments', options: { sort: { createdAt: -1 } } })
      .populate({ path: 'referrals', options: { sort: { createdAt: -1 } } })
      .populate({ path: 'transitions', options: { sort: { createdAt: -1 } } })
      .populate({ path: 'deposits', options: { sort: { createdAt: -1 } } })
      .populate({ path: 'withdrawals', options: { sort: { createdAt: -1 } } })
      .exec();
    return users.map(this.toUserDto);
    // } else {
    //   return [];
    // }
  }

  async findOne(id: string): Promise<UserDto> {
    return await this.userModel
      .findOne({ _id: new Types.ObjectId(id) })
      .populate({ path: 'payments', options: { sort: { createdAt: -1 } } })
      .populate({ path: 'referrals', options: { sort: { createdAt: -1 } } })
      .populate({ path: 'transitions', options: { sort: { createdAt: -1 } } })
      .populate({ path: 'deposits', options: { sort: { createdAt: -1 } } })
      .populate({ path: 'withdrawals', options: { sort: { createdAt: -1 } } })
      .exec()
      .then(this.toUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const { email, oldPassword, newPassword, repeatPassword } = updateUserDto;

    const user = await this.userModel.findOne({
      _id: new Types.ObjectId(id),
    });

    if (!user) {
      throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);
    }

    if (email) {
      user.email = email;
    }
    if (oldPassword && newPassword && repeatPassword) {
      if (
        newPassword === repeatPassword &&
        bcrypt.compare(oldPassword, user.password)
      ) {
        user.password = newPassword;
      } else {
        throw new HttpException(
          'No enough data for updating',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    await user.save();
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const { deletedCount } = await this.userModel.deleteOne({ id }).exec();

    return deletedCount === 1;
  }

  async getReferralsByUserName(username: string) {
    await this.userModel
      .findOne({ username: username })
      .populate({ path: 'referrals', options: { sort: { createdAt: -1 } } })
      .exec()
      .then((data) => data.referrals);
  }

  toUserDto(data: User): UserDto {
    const {
      username,
      email,
      id,
      payments,
      referredBy,
      createdAt,
      referrals,
      transitions,
      deposits,
      balance,
      withdrawals,
    } = data;

    return {
      username,
      email,
      id,
      payments,
      referredBy,
      createdAt,
      referrals,
      balance,
      transitions,
      deposits,
      withdrawals,
    };
  }

  private query(filter: Partial<User>): Promise<User> {
    return this.userModel.findOne(filter).exec();
  }
}
