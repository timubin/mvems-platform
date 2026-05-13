import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private prisma: PrismaService) {}

  async sendBookingConfirmation(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        attendee: true,
        event: true,
        items: { include: { ticketTier: true } },
      },
    });

    if (!order) {
      this.logger.error(`Order ${orderId} not found for notification.`);
      return false;
    }

    this.logger.log(`[EMAIL OUTBOX] To: ${order.attendee.email}`);
    this.logger.log(
      `[EMAIL SUBJECT] Your Tickets for ${order.event.title} are confirmed!`,
    );
    this.logger.log(
      `[EMAIL BODY] Hi ${order.attendee.fullName}, your payment of $${order.totalAmount.toString()} was successful.`,
    );

    return true;
  }

  async sendAbandonedCartReminder(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { attendee: true, event: true },
    });

    if (!order || order.status !== 'PENDING') return false;

    this.logger.log(`[EMAIL OUTBOX] To: ${order.attendee.email}`);
    this.logger.log(
      `[EMAIL SUBJECT] Complete your booking for ${order.event.title}!`,
    );
    this.logger.log(
      `[EMAIL BODY] Your cart will expire soon. Click here to checkout.`,
    );

    return true;
  }

  async sendVendorApplicationStatus(
    vendorId: string,
    boothName: string,
    status: string,
  ) {
    const vendor = await this.prisma.user.findUnique({
      where: { id: vendorId },
    });
    if (!vendor) return false;

    this.logger.log(`[EMAIL OUTBOX] To: ${vendor.email}`);
    this.logger.log(
      `[EMAIL SUBJECT] Update on your Booth Application: ${boothName}`,
    );
    this.logger.log(
      `[EMAIL BODY] Your application status has been updated to: ${status}.`,
    );

    return true;
  }
}
