import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SalesModule } from './sales/sales.module';

import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';


const CORE_MODULES = [
    ConfigModule,
    DatabaseModule,
    AuthModule,
    MulterModule.register({
        dest: '/tmp/upload',
    })
];

@Module({
    imports: [
        ...CORE_MODULES,
        UsersModule,
        ProfilesModule,
        SalesModule,
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
    ],
})
export class AppModule {
}
