import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { Withdrawal, WithdrawalDocument } from './schemas/withdrawal.schema';
import { HttpService } from '@nestjs/axios';
import configuration from 'src/config/configuration';

const MIN_WITHDRAWAL = 10;
const nowPaymentsSecretKey = configuration().nowPaymentsSecretKey;

@Injectable()
export class WithdrawalsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Withdrawal.name)
    private withdrawalModel: Model<WithdrawalDocument>,
    private httpService: HttpService,
  ) {}

  async create(createWithdrawalDto: CreateWithdrawalDto) {
    const { userId, amount, wallet, cryptocurrency } = createWithdrawalDto;

    const user = await this.userModel
      .findOne({
        _id: new Types.ObjectId(userId),
      })
      .populate('withdrawals');

    const alreadyWithdrawnFundsToday = this.getAlreadyWithdrawnFundsToday(user);

    if (
      Number(user?.balance || '0') >= Number(amount) &&
      Number(user?.balance) > MIN_WITHDRAWAL &&
      !alreadyWithdrawnFundsToday
    ) {
      const createWithdrawal = new this.withdrawalModel({
        amount: String(amount),
        wallet: String(wallet),
        cryptocurrency: String(cryptocurrency),
        status: 'opened',
        updatedAt: new Date(),
        createdAt: new Date(),
      });
      await createWithdrawal.save();

      await this.userModel.findOneAndUpdate(
        { _id: new Types.ObjectId(userId) },
        { $push: { withdrawals: createWithdrawal } },
      );
      user.balance = String(Number(user.balance) - Number(amount));
      await user.save();
    } else {
      return null;
    }
  }

  async findAll() {
    console.log('');
  }

  async getCurrencies() {
    try {
      const response = await this.httpService
        .get('https://api.nowpayments.io/v1/full-currencies', {
          headers: {
            'x-api-key': nowPaymentsSecretKey,
            'Content-Type': 'application/json',
          },
        })
        .toPromise();
      return response?.data?.currencies;
    } catch (e) {
      console.log(e);
    }
  }

  async updateWithdrawal(id) {
    const withdrawal = await this.withdrawalModel.findOne({
      _id: new Types.ObjectId(id),
    });
    withdrawal.status = 'closed';
    await withdrawal.save();
  }

  getAlreadyWithdrawnFundsToday(user) {
    const now = new Date().toDateString();
    const result = user.withdrawals.filter(
      (w) => w.createdAt.toDateString() === now,
    );
    return !!result.length;
  }
}
