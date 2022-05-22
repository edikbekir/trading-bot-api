import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { username } = createUserDto;
    const user = await this.query({ username });

    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();

    return this.toUserDto(createdUser);
  }

  async findByLogin({ email, password }): Promise<UserDto> {
    const user = await this.query({ email });

    if (!user) {
      throw new HttpException('user does not exists', HttpStatus.BAD_REQUEST);
    }

    if (await bcrypt.compare(password, user.password)) {
      return this.toUserDto(user);
    }

    throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
  }

  async findAll(): Promise<UserDto[]> {
    const users: User[] = await this.userModel.find().exec();

    return users.map(this.toUserDto);
  }

  async findOne(id: string): Promise<UserDto> {
    return await this.userModel
      .findOne({ id })
      .populate('payments')
      .exec()
      .then(this.toUserDto);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    await this.userModel.updateOne({ id }, updateUserDto).exec();

    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const { deletedCount } = await this.userModel.deleteOne({ id }).exec();

    return deletedCount === 1;
  }

  toUserDto(data: User): UserDto {
    const { username, email, id, payments } = data;

    return { username, email, id, payments };
  }

  private query(filter: Partial<User>): Promise<User> {
    return this.userModel.findOne(filter).exec();
  }
}
