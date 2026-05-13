import { PrismaService } from '../prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
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
