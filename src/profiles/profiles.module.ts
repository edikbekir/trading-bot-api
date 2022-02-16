import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MODELS } from './schemas/models';

import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';

@Module({
    imports: [
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
