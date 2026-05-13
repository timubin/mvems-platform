import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(email: string, password: string, fullName: string, role?: string): Promise<{
        message: string;
        userId: any;
    }>;
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        message: string;
        accessToken: string;
        user: {
            id: any;
            email: any;
            fullName: any;
            role: any;
        };
    }>;
}
