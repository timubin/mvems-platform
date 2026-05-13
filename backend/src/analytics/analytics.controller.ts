import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard/:eventId')
  async getDashboard(@Param('eventId') eventId: string) {
    return this.analyticsService.getEventDashboardMetrics(eventId);
  }

  @Get('platform')
  async getPlatformMetrics() {
    return this.analyticsService.getPlatformMetrics();
  }

  @Get('report/:eventId')
  async getReport(@Param('eventId') eventId: string) {
    return this.analyticsService.getAttendeeListReport(eventId);
  }
}
