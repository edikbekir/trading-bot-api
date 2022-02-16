import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UsersService,
    ) {
    }

    @Post('register')
    async register(@Body() registerDto: CreateUserDto) {
        const user = await this.userService.create(registerDto);
        const payload = { username: user.username };
        const token = await this.authService.signPayload(payload);

        return { user, token };
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.userService.findByLogin(loginDto);
        const payload = { username: user.username };
        const token = this.authService.signPayload(payload);

        return { user, token };
    }
}
