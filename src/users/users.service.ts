import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Query } from 'mongoose';
import { use } from 'passport';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username } = createUserDto;

    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();

    return this.sanitizeUser(createdUser);
  }

  async findByLogin({ username, password }): Promise<User> {
    const user = await this.findOne(username);
    if (!user) {
      throw new HttpException('user does not exists', HttpStatus.BAD_REQUEST);
    }

    console.log(password)
    console.log(user.password)

    console.log('Password', await bcrypt.compare(password, user.password));

    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    }

    throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  sanitizeUser(user: User) {
    console.log('user', user);
    return user;
    // const sanitized = user.toObject();
    // delete sanitized['password'];
    // return sanitized;
  }
}
