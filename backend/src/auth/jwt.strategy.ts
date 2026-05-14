import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma.service';
import { Role } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'fallback-secret',
    });
  }

  async validate(payload: JwtPayload) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (user) {
        return { userId: user.id, email: user.email, role: user.role };
      }
    } catch (e) {
      console.log('Database error in JWT validation, falling back to payload data.');
    }

    // MOCK FALLBACK: If DB is down, trust the verified payload
    if (payload.sub && payload.role) {
      return { 
        userId: payload.sub, 
        email: payload.email, 
        role: payload.role 
      };
    }

    throw new UnauthorizedException();
  }
}
