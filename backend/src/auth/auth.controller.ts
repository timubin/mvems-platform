import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from '@prisma/client';
import { Throttle } from '@nestjs/throttler';

export interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
  role?: Role;
}

export interface LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { limit: 5, ttl: 60000 } }) // Max 5 attempts per minute
  @Post('register')
  async register(@Body() body: RegisterDto) {
    try {
      return await this.authService.register(
        body.email,
        body.password,
        body.fullName,
        body.role,
      );
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Registration failed';
      throw new ConflictException(message);
    }
  }

  @Throttle({ default: { limit: 5, ttl: 60000 } }) // Max 5 attempts per minute
  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
