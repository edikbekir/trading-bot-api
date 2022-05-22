import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payment.module';

const CORE_MODULES = [
  ConfigModule,
  DatabaseModule,
  AuthModule,
  MulterModule.register({
    dest: '/tmp/upload',
  }),
];

@Module({
  imports: [...CORE_MODULES, UsersModule, PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
