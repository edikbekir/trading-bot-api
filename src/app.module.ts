import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { SalesModule } from './sales/sales.module';
import { DatabaseModule } from './database/database.module';

import { ConfigModule } from './config/config.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

const CORE_MODULES = [
    ConfigModule,
    DatabaseModule,
    AuthModule,
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
