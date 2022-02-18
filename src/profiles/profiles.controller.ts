import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Types } from 'mongoose';


@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {
    }

    @Post()
    create(@Body() createProfileDto: CreateProfileDto) {
        return this.profilesService.create(createProfileDto);
    }

    @Get()
    findAll() {
        return this.profilesService.findAll();
    }

    @Get()
    findByUser(@Query('userId') id: Types.ObjectId) {
        // return this.profilesService.findByFilter({ user_id: id });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.profilesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
        return this.profilesService.update(+id, updateProfileDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.profilesService.remove(+id);
    }
}
