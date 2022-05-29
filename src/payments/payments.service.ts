import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentDto } from './dto/payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from '../payments/schemas/payment.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Types } from 'mongoose';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { HttpService } from '@nestjs/axios';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import configuration from 'src/config/configuration';
import {
  Referral,
  ReferralDocument,
} from 'src/referrals/schemas/referral.schema';

const nowPaymentsSecretKey = configuration().nowPaymentsSecretKey;

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Referral.name) private referralModel: Model<ReferralDocument>,
    private httpService: HttpService,
  ) {}

  async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<any> {
    try {
      const { userId, orderId, amount, currency } = createInvoiceDto;
      const successUrl = this._getSuccessUrl(userId, orderId, amount, currency);
      const cancelUrl = this._getCancelUrl(userId, orderId, amount, currency);
      console.log(successUrl);
      const invoice = await this.httpService
        .post(
          'https://api.nowpayments.io/v1/invoice',
          {
            price_amount: createInvoiceDto.amount,
            price_currency: createInvoiceDto.currency.toLowerCase(),
            pay_currency: createInvoiceDto.payCurrency.toLowerCase(),
            cancel_url: cancelUrl,
            success_url: successUrl,
            order_id: orderId,
          },
          {
            headers: {
              'x-api-key': nowPaymentsSecretKey,
              'Content-Type': 'application/json',
            },
          },
        )
        .toPromise();
      return invoice.data;
    } catch (e) {
      console.log(e);
    }
  }

  async findOne(id: string): Promise<PaymentDto> {
    return await this.paymentModel
      .findOne({ _id: new Types.ObjectId(id) })
      .exec();
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    await this.paymentModel
      .updateOne({ _id: new Types.ObjectId(id) }, updatePaymentDto)
      .exec();

    return await this.findOne(id);
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<PaymentDto> {
    const { userId } = createPaymentDto;
    const createPayment = new this.paymentModel({
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createPaymentDto,
    });
    await createPayment.save();

    const currentUser = await this.userModel.findOne({
      _id: new Types.ObjectId(userId),
    });

    await currentUser.updateOne(
      { _id: new Types.ObjectId(userId) },
      { $push: { payments: createPayment } },
    );

    currentUser.balance = String(
      parseFloat(currentUser.balance || '0') +
        parseFloat(createPaymentDto.amount),
    );

    await currentUser.save();

    if (currentUser.referredBy) {
      const parentUser = await this.userModel
        .findOne({
          username: currentUser.referredBy,
        })
        .populate('referrals');

      parentUser.balance = String(
        parseFloat(parentUser.balance || '0') +
          parseFloat(String(Number(createPaymentDto.amount) * 0.05)),
      );
      parentUser.referrals.map(async (r) => {
        if (r.name === currentUser.username) {
          await this.referralModel
            .updateOne(
              {
                _id: new Types.ObjectId(r.id),
              },
              {
                reward: String(
                  parseFloat(r.reward || '0') +
                    parseFloat(String(Number(createPaymentDto.amount) * 0.05)),
                ),
                amount: String(
                  parseFloat(r.amount || '0') +
                    parseFloat(String(Number(createPaymentDto.amount))),
                ),
              },
            )
            .exec();
        }
      });

      await parentUser.save();
    }

    await this.userModel.findOneAndUpdate(
      { _id: new Types.ObjectId(userId) },
      { $push: { payments: createPayment } },
    );

    const { id, status, amount, currency, createdAt, updatedAt, orderId } =
      createPayment;

    return {
      id,
      status,
      amount,
      currency,
      createdAt,
      updatedAt,
      orderId,
    };
  }

  _getCancelUrl(userId, orderId, amount, currency) {
    return `http://localhost:3001/account/deposit/cancel?orderId=${orderId}&userId=${userId}&amount=${amount}&currency=${currency}`;
  }
  _getSuccessUrl(userId, orderId, amount, currency) {
    return `http://localhost:3001/account/deposit/success?orderId=${orderId}&userId=${userId}&amount=${amount}&currency=${currency}`;
  }
}
