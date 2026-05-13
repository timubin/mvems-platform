import { PrismaService } from '../prisma.service';
export declare class NotificationService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    sendBookingConfirmation(orderId: string): Promise<boolean>;
    sendAbandonedCartReminder(orderId: string): Promise<boolean>;
    sendVendorApplicationStatus(vendorId: string, boothName: string, status: string): Promise<boolean>;
}
