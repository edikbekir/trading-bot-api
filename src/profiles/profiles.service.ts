import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './profile.schema';

@Injectable()
export class ProfilesService {
    constructor(
        @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    ) {
    }

    create(createProfileDto: CreateProfileDto): Promise<Profile> {
        const createdProfile = new this.profileModel(createProfileDto);
        return createdProfile.save();
    }

    findAll() {
        return `This action returns all profiles`;
    }

    findOne(id: number) {
        return `This action returns a #${id} profile`;
    }

    update(id: number, updateProfileDto: UpdateProfileDto) {
        return `This action updates a #${id} profile`;
    }

    remove(id: number) {
        return `This action removes a #${id} profile`;
    }
}
