import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
        message: string;
        userId: any;
    }>;
    login(body: any): Promise<{
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
