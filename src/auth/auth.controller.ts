import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthRo } from './auth.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  @ApiCreatedResponse({ description: 'User has been created', type: AuthRo })
  async register(@Body() registerDto: CreateUserDto): Promise<AuthRo> {
    const user = await this.userService.create(registerDto);

    const payload = { email: user.email };
    const token = this.authService.signPayload(payload);

    return { user, token };
  }

  @Post('login')
  @ApiCreatedResponse({ description: 'Successful login', type: AuthRo })
  async login(@Body() loginDto: LoginDto): Promise<AuthRo> {
    const user = await this.userService.findByLogin(loginDto);
    const payload = { email: user.email };
    const token = this.authService.signPayload(payload);

    return { user, token };
  }
}
