import { PrismaService } from '../prisma.service';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrder(attendeeId: string, eventId: string, items: {
        tierId: string;
        quantity: number;
    }[], couponCode?: string): Promise<any>;
}
