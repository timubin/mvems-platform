import { PrismaService } from '../prisma.service';
export declare class PaymentService {
    private prisma;
    constructor(prisma: PrismaService);
    createPaymentIntent(orderId: string): Promise<{
        clientSecret: string;
    }>;
    handleStripeWebhook(signature: string, payload: Buffer): Promise<{
        received: boolean;
    }>;
}
