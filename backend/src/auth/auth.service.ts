import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(data: any) {
    // Check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // In a real scenario, hash the password using bcrypt here!
    const passwordHash = `hashed_${data.password}`; 

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        fullName: data.fullName,
        role: data.role || 'ATTENDEE'
      }
    });

    return { message: 'User registered successfully', userId: user.id };
  }

  async login(data: any) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email }
    });

    // In a real scenario, compare hashed passwords using bcrypt
    if (!user || user.passwordHash !== `hashed_${data.password}`) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Return JWT token here
    return {
      message: 'Login successful',
      accessToken: 'sample_jwt_token_here',
      user: { id: user.id, email: user.email, role: user.role }
    };
  }
}
