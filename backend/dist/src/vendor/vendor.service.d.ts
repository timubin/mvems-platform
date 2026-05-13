import { PrismaService } from '../prisma.service';
export declare class VendorService {
    private prisma;
    constructor(prisma: PrismaService);
    applyForBooth(vendorId: string, boothId: string): Promise<any>;
    processApplication(applicationId: string, action: 'APPROVED' | 'REJECTED'): Promise<{
        success: boolean;
        status: "APPROVED" | "REJECTED";
    }>;
    getVenueMapBooths(eventId: string): Promise<any>;
    collectLead(vendorId: string, scannedAttendeeId: string): Promise<{
        message: string;
        lead: any;
    }>;
}
