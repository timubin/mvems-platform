import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

/**
 * Phase 10 - VENDOR & SPONSOR ECOSYSTEM (Module 11)
 */
@Injectable()
export class VendorService {
  constructor(private prisma: PrismaService) {}

  /**
   * VEND-01: Vendor Applications
   * Vendors apply for specific booth spaces at an event.
   */
  async applyForBooth(vendorId: string, boothId: string) {
    const booth = await this.prisma.booth.findUnique({
      where: { id: boothId },
    });
    if (!booth) throw new NotFoundException('Booth not found');
    if (booth.isAssigned)
      throw new BadRequestException('Booth is already assigned');

    // Create the vendor application
    const application = await this.prisma.vendorApplication.create({
      data: {
        eventId: booth.eventId,
        vendorId,
        businessName: 'Vendor Business', // Placeholder
        category: 'Exhibitor',
        status: 'SUBMITTED',
      },
    });

    // Mark booth as assigned (simplified logic for this schema)
    await this.prisma.booth.update({
      where: { id: boothId },
      data: { isAssigned: true, vendorId },
    });

    return application;
  }

  /**
   * Admin/Organizer action to process (approve or reject) a vendor application
   */
  async processApplication(
    applicationId: string,
    action: 'APPROVED' | 'REJECTED',
  ) {
    const app = await this.prisma.vendorApplication.findUnique({
      where: { id: applicationId },
    });
    if (!app) throw new NotFoundException('Application not found');

    await this.prisma.vendorApplication.update({
      where: { id: applicationId },
      data: { status: action === 'APPROVED' ? 'APPROVED' : 'REJECTED' },
    });

    if (action === 'REJECTED') {
      // Logic for rejection (maybe delete the application or just leave it as REJECTED)
    } else {
      // In this schema, applications are per-event, not per-booth.
      // Typically, an admin would assign a specific booth after approving.
    }

    // Note: Here we would trigger NOTIF-04 to send an email to the vendor

    return { success: true, status: action };
  }

  /**
   * VEND-02: Interactive Maps Data
   * Fetch all booths for a specific event to render a visual map showing Available/Sold spaces.
   */
  async getVenueMapBooths(eventId: string) {
    return this.prisma.booth.findMany({
      where: { eventId },
      include: {
        vendor: {
          select: { businessName: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  /**
   * VEND-03: Lead Retrieval
   * Vendor scans an attendee's QR code (User ID) to collect their information as a lead.
   */
  async collectLead(vendorId: string, scannedAttendeeId: string) {
    const attendee = await this.prisma.user.findUnique({
      where: { id: scannedAttendeeId },
      select: { id: true, fullName: true, email: true, phone: true },
    });

    if (!attendee)
      throw new NotFoundException('Invalid QR code / Attendee not found');

    // In a full implementation, we would save this to a `Lead` table
    // For now, returning the attendee's data simulating a successful scan
    return {
      message: 'Lead collected successfully',
      lead: attendee,
    };
  }
}
