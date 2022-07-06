import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signPayload(payload: any): string {
    return this.jwtService.sign(payload);
  }
}
