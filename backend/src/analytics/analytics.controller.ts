import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('analytics')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Roles(Role.ORGANIZER, Role.SUPER_ADMIN)
  @Get('event/:id')
  async getEventMetrics(@Param('id') eventId: string) {
    return this.analyticsService.getEventDashboardMetrics(eventId);
  }

  @Roles(Role.ORGANIZER, Role.SUPER_ADMIN)
  @Get('event/:id/attendees')
  async getAttendeeReport(@Param('id') eventId: string) {
    return this.analyticsService.getAttendeeListReport(eventId);
  }

  @Roles(Role.SUPER_ADMIN)
  @Get('platform')
  async getPlatformStats() {
    return this.analyticsService.getPlatformMetrics();
  }
}
