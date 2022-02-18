import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { TransformInterceptor } from '../transform.interceptor';
import { ProfileDto } from './dto/profile.dto';


@ApiTags('Profiles')
@UseInterceptors(TransformInterceptor)
@Controller('profiles')
export class ProfilesController {
	constructor(private readonly profilesService: ProfilesService) {
	}

	@Post()
	create(@Body() createProfileDto: CreateProfileDto): Promise<ProfileDto> {
		return this.profilesService.create(createProfileDto);
	}

	@Get()
	findAll(): Promise<ProfileDto[]> {
		return this.profilesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<ProfileDto> {
		return this.profilesService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto): Promise<ProfileDto> {
		return this.profilesService.update(id, updateProfileDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string): Promise<boolean> {
		return this.profilesService.remove(id);
	}
}
