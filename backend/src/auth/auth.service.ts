import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(email: string, password: string, fullName: string, role?: string) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // In a real scenario, use bcrypt to hash the password
    const passwordHash = `hashed_${password}`; 

    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        fullName,
        role: role || 'ATTENDEE'
      }
    });

    return { message: 'User registered successfully', userId: user.id };
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    // In a real scenario, use bcrypt.compare
    if (user && user.passwordHash === `hashed_${password}`) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    // Return JWT token here (Normally you'd use JwtService)
    return {
      message: 'Login successful',
      accessToken: 'sample_jwt_token_for_demo',
      user: { id: user.id, email: user.email, fullName: user.fullName, role: user.role }
    };
  }
}
