import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Model, Types } from 'mongoose';
import { CreateDepositDto, BuildDepositDto } from './dto/create-deposit.dto';
import { Deposit, DepositDocument } from './schemas/deposit.schema';

const DEPOSITS = [
  {
    id: 0,
    title: 'Тариф на 1 день',
    info: ['1.4% ставка в день', 'Возврат депозита через 24 часа'],
    interestRate: 1.4,
    capitalisation: false,
    fee: 0.1,
    periods: 1,
  },
  {
    id: 1,
    title: 'Тариф на 5 дней',
    info: ['1.5% ставка в день', 'Возврат депозита через 5 дней'],
    interestRate: 1.5,
    capitalisation: true,
    fee: 0.1,
    periods: 5,
  },
  {
    id: 2,
    title: 'Тариф на 15 дней',
    info: ['1.6% ставка в день', 'Возврат депозита через 15 дней'],
    interestRate: 1.6,
    capitalisation: true,
    fee: 0.1,
    periods: 15,
  },
  {
    id: 3,
    title: 'Тариф на 30 дней',
    info: ['1.7% ставка в день', 'Возврат депозита через 30 дней'],
    interestRate: 1.7,
    capitalisation: true,
    fee: 0.1,
    periods: 30,
  },
];

@Injectable()
export class DepositsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Deposit.name) private depositModel: Model<DepositDocument>,
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
    user.deposits.forEach(async (deposit) => {
      const endTime = deposit.endDate.getTime();
      const currentTime = new Date().getTime();
      if (currentTime > endTime) {
        await this.depositModel.findOneAndUpdate(
          { _id: new Types.ObjectId(deposit.id) },
          { status: 'closed' },
        );
      }
    });
  }

  buildDepositData(data: BuildDepositDto) {
    const endDate = this.addDays(new Date(), data.periods);
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
