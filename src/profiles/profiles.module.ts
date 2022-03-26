import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MODELS } from './schemas/models';

import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { StorageModule } from '../providers/storage/storage.module';

@Module({
    imports: [
        StorageModule,
        MongooseModule.forFeature(MODELS),
    ],
    controllers: [
        ProfilesController,
    ],
    providers: [
        ProfilesService,
    ]
})
export class ProfilesModule {
}
