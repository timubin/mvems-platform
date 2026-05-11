import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

/**
 * Phase 8 - NOTIFICATION SYSTEM (Module 08)
 */
@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * NOTIF-05: Send Booking Confirmation (Email & In-App)
   * Triggered when an order is successfully paid via Stripe webhook.
   * Includes logic for generating QR code tickets.
   */
  async sendBookingConfirmation(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        attendee: true,
        event: true,
        items: { include: { tier: true } }
      }
    });

    if (!order) {
      this.logger.error(`Order ${orderId} not found for notification.`);
      return false;
    }

    // TODO: Generate PDF Invoice & QR Code here
    
    // Mock Email Sending Logic (e.g., using SendGrid/SES)
    this.logger.log(`[EMAIL OUTBOX] To: ${order.attendee.email}`);
    this.logger.log(`[EMAIL SUBJECT] Your Tickets for ${order.event.title} are confirmed!`);
    this.logger.log(`[EMAIL BODY] Hi ${order.attendee.fullName}, your payment of $${order.totalAmount} was successful.`);
    
    // Here we would also create an In-App Notification if we had a Notification DB model
    return true;
  }

  /**
   * NOTIF-03: Send Abandoned Cart Reminder
   * Intended to be triggered by a background cron job for PENDING orders about to expire.
   */
  async sendAbandonedCartReminder(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { attendee: true, event: true }
    });

    if (!order || order.status !== 'PENDING') return false;

    this.logger.log(`[EMAIL OUTBOX] To: ${order.attendee.email}`);
    this.logger.log(`[EMAIL SUBJECT] Complete your booking for ${order.event.title}!`);
    this.logger.log(`[EMAIL BODY] Your cart will expire soon. Click here to checkout.`);
    
    return true;
  }

  /**
   * NOTIF-04: Vendor Alerts
   * Triggered when an admin approves or rejects a vendor's booth application.
   */
  async sendVendorApplicationStatus(vendorId: string, boothName: string, status: string) {
    const vendor = await this.prisma.user.findUnique({ where: { id: vendorId } });
    if (!vendor) return false;

    this.logger.log(`[EMAIL OUTBOX] To: ${vendor.email}`);
    this.logger.log(`[EMAIL SUBJECT] Update on your Booth Application: ${boothName}`);
    this.logger.log(`[EMAIL BODY] Your application status has been updated to: ${status}.`);

    return true;
  }
}
