import { Module } from '@nestjs/common';
import { ConfigModule as ConfigurationModule } from '@nestjs/config';

import configuration from './configuration';

const configurationProvider = ConfigurationModule.forRoot({
    load: [configuration],
});

@Module({
    imports: [
        configurationProvider,
    ],
    exports: [
        configurationProvider,
    ]
})
export class ConfigModule {
}
