import { PrismaService } from '../prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getEventDashboardMetrics(eventId: string): Promise<{
        totalRevenue: any;
        ticketsSold: any;
        totalOrders: any;
        boothsSold: any;
    }>;
    getAttendeeListReport(eventId: string): Promise<any>;
    getPlatformMetrics(): Promise<{
        totalUsers: any;
        totalEvents: any;
        totalPlatformRevenue: number;
    }>;
}
