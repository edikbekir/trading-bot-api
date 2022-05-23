import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentDto } from './dto/payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from '../payments/schemas/payment.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Types } from 'mongoose';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<PaymentDto> {
    const { userId } = createPaymentDto;
    const createPayment = new this.paymentModel({
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createPaymentDto,
    });
    await createPayment.save();

    await this.userModel.findOneAndUpdate(
      { _id: new Types.ObjectId(userId) },
      { $push: { payments: createPayment } },
    );

    const {
      id,
      status,
      total,
      currency,
      createdAt,
      updatedAt,
      servicePaymentId,
    } = createPayment;

    return {
      id,
      status,
      total,
      currency,
      createdAt,
      updatedAt,
      servicePaymentId,
    };
  }
}
