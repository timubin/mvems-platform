import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

@Controller('vendor')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Roles(Role.VENDOR)
  @Post('apply')
  async apply(@Body() body: { vendorId: string; boothId: string }) {
    return this.vendorService.applyForBooth(body.vendorId, body.boothId);
  }

  @Roles(Role.ORGANIZER, Role.SUPER_ADMIN)
  @Patch('application/:id')
  async process(
    @Param('id') id: string,
    @Body() body: { action: 'APPROVED' | 'REJECTED' },
  ) {
    return this.vendorService.processApplication(id, body.action);
  }

  @Get('map/:eventId')
  async getMap(@Param('eventId') eventId: string) {
    return this.vendorService.getVenueMapBooths(eventId);
  }

  @Roles(Role.VENDOR)
  @Post('lead')
  async collectLead(@Body() body: { vendorId: string; attendeeId: string }) {
    return this.vendorService.collectLead(body.vendorId, body.attendeeId);
  }
}
