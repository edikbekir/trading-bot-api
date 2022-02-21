import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    ) {
    }
    async create(createProfileDto: CreateProfileDto): Promise<ProfileDto> {
        const createdProfile = new this.profileModel(createProfileDto);
        await createdProfile.save();

        return this.toProfileDto(createdProfile);
    }

    async findAll(): Promise<ProfileDto[]> {
        const profiles = await this.profileModel.find().exec();

        return profiles.map(this.toProfileDto);
    }

    findOne(id: string): Promise<ProfileDto> {
        return this.query({ id }).then(this.toProfileDto);
    }

    async update(id: string, updateProfileDto: UpdateProfileDto): Promise<ProfileDto> {
        await this.profileModel.updateOne({ id }, updateProfileDto);

        return this.findOne(id);
    }

    async remove(id: string): Promise<boolean> {
        await this.profileModel.deleteOne({ id }).exec();

        return true;
    }

    private toProfileDto(data: Profile): ProfileDto {
        const { id, name, credentials, proxy, twoFA } = data;

        return { id, name, credentials, proxy, twoFA };
    }

    private query(filter: Partial<ProfileDto>): Promise<ProfileDto> {
        return this.profileModel.findOne(filter ).exec();
    }
}
