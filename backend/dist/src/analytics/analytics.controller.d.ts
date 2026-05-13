import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getDashboard(eventId: string): Promise<{
        totalRevenue: any;
        ticketsSold: any;
        totalOrders: any;
        boothsSold: any;
    }>;
    getPlatformMetrics(): Promise<{
        totalUsers: any;
        totalEvents: any;
        totalPlatformRevenue: number;
    }>;
    getReport(eventId: string): Promise<any>;
}
