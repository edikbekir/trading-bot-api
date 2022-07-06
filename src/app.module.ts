import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payment.module';
import { ReferralModule } from './referrals/referral.module';
import { TransitionModule } from './transitions/transition.module';
import { DepositsModule } from './deposits/deposits.module';
import { WithdrawalsModule } from './withdrawals/withdrawals.module';
import { MailModule } from './mail/mail.module';

const CORE_MODULES = [
  ConfigModule,
  DatabaseModule,
  AuthModule,
  MulterModule.register({
    dest: '/tmp/upload',
  }),
];

@Module({
  imports: [
    ...CORE_MODULES,
    UsersModule,
    PaymentsModule,
    ReferralModule,
    TransitionModule,
    DepositsModule,
    WithdrawalsModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
