import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Model, Types } from 'mongoose';
import { CreateDepositDto, BuildDepositDto } from './dto/create-deposit.dto';
import { Deposit, DepositDocument } from './schemas/deposit.schema';
import {
  Referral,
  ReferralDocument,
} from 'src/referrals/schemas/referral.schema';

const ONE_DAY = 1;

const DEPOSITS = [
  {
    id: 0,
    title: '3 круга',
    info: ['1.4% ставка в день', 'Возврат депозита через 24 часа'],
    interestRate: 15,
    capitalisation: false,
    fee: 3,
    periods: 3,
  },
  {
    id: 1,
    title: '6 круга',
    info: ['1.5% ставка в день', 'Возврат депозита через 5 дней'],
    interestRate: 15,
    capitalisation: true,
    fee: 3,
    periods: 6,
  },
  {
    id: 2,
    title: '9 кругов',
    info: ['1.6% ставка в день', 'Возврат депозита через 15 дней'],
    interestRate: 15,
    capitalisation: true,
    fee: 3,
    periods: 9,
  },
  {
    id: 3,
    title: '12 кругов',
    info: ['1.7% ставка в день', 'Возврат депозита через 30 дней'],
    interestRate: 15,
    capitalisation: true,
    fee: 3,
    periods: 12,
  },
];

@Injectable()
export class DepositsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Deposit.name) private depositModel: Model<DepositDocument>,
    @InjectModel(Referral.name) private referralModel: Model<ReferralDocument>,
  ) {}

  async create(createDepositDto: CreateDepositDto) {
    const { userId, amount, depositType } = createDepositDto;

    const user = await this.userModel.findOne({
      _id: new Types.ObjectId(userId),
    });
    const depositTemplate = DEPOSITS[Number(depositType)];
    const data = this.buildDepositData({
      ...depositTemplate,
      amount: Number(amount),
    });

    if (
      Number(user?.balance || '0') >= Number(amount) &&
      Number(user?.balance) > 0
    ) {
      const createDeposit = new this.depositModel({
        ...data,
        createdAt: new Date(),
        amount: String(amount),
        updatedAt: new Date(),
        status: 'opened',
      });
      await createDeposit.save();

      await this.userModel.findOneAndUpdate(
        { _id: new Types.ObjectId(userId) },
        { $push: { deposits: createDeposit } },
      );
      user.balance = String(Number(user.balance) - Number(amount));
      await user.save();
    } else {
      console.log('The balance is not enough to create a deposit');
      return null;
    }
  }

  async reviseStatuses(userId: string) {
    const user = await this.userModel
      .findOne({
        _id: new Types.ObjectId(userId),
      })
      .populate({ path: 'deposits', options: { sort: { createdAt: -1 } } });
    user.deposits
      .filter((d) => d.status === 'opened')
      .forEach(async (deposit) => {
        const endTime = deposit.endDate.getTime();
        const currentTime = new Date().getTime();
        if (currentTime > endTime) {
          this.updateReferrals(user, deposit.income);
          await this.depositModel.findOneAndUpdate(
            { _id: new Types.ObjectId(deposit.id) },
            { status: 'closed' },
          );
          user.balance = String(
            parseFloat(user.balance || '0') +
              parseFloat(String(Number(deposit.income))) +
              parseFloat(String(Number(deposit.amount))),
          );
          user.save();
        }
      });
  }

  async updateReferrals(user, income) {
    if (user.referredBy) {
      const parentUser = await this.userModel
        .findOne({
          username: user.referredBy,
        })
        .populate('referrals');

      parentUser.balance = String(
        parseFloat(parentUser.balance || '0') +
          parseFloat(String(Number(income) * 0.05)),
      );
      parentUser.referrals.map(async (r) => {
        if (r.name === user.username) {
          await this.referralModel
            .updateOne(
              {
                _id: new Types.ObjectId(r.id),
              },
              {
                reward: String(
                  parseFloat(r.reward || '0') +
                    parseFloat(String(Number(income) * 0.05)),
                ),
                amount: String(
                  parseFloat(r.amount || '0') +
                    parseFloat(String(Number(income))),
                ),
              },
            )
            .exec();
        }
      });

      await parentUser.save();
    }
  }

  buildDepositData(data: BuildDepositDto) {
    const endDate = this.addDays(new Date(), ONE_DAY);
    const total = Number.parseFloat(
      String(
        Number(data.amount) *
          Math.pow(1 + (data.interestRate - data.fee) / 100, data.periods),
      ),
    ).toFixed(2);

    const income = Number.parseFloat(
      String(Number(total) - Number(data.amount)),
    ).toFixed(2);

    return {
      period: data.periods,
      total: String(total),
      income: String(income),
      endDate,
    };
  }

  addDays(date, days) {
    const copy = date;
    copy.setDate(date.getDate() + days);
    return copy;
  }
}
