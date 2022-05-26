import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Referral, ReferralSchema } from './schemas/referral.schema';
import { ReferralsController } from './referrals.controller';
import { ReferralsService } from './referrals.service';
import { UserSchema, User } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Referral.name,
        schema: ReferralSchema,
      },
    ]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ReferralsController],
  providers: [ReferralsService],
})
export class ReferralModule {}
