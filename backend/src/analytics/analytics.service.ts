import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

/**
 * Phase 11 - ANALYTICS & REPORTING SYSTEM (Module 12)
 */
@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  /**
   * STAT-01: Real-Time Dashboard Metrics
   * Generates live metrics for an organizer's specific event.
   * Tracks Revenue, Ticket Sales, Total Orders, and Booth Sales.
   */
  async getEventDashboardMetrics(eventId: string) {
    const event = await this.prisma.event.findUnique({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');

    const totalOrders = await this.prisma.order.count({
      where: { eventId, status: 'COMPLETED' }
    });

    // Calculate total revenue from successful orders
    const revenueResult = await this.prisma.order.aggregate({
      where: { eventId, status: 'COMPLETED' },
      _sum: { totalAmount: true }
    });

    // Calculate total tickets sold
    const ticketsSold = await this.prisma.orderItem.aggregate({
      where: { order: { eventId, status: 'COMPLETED' } },
      _sum: { quantity: true }
    });

    // Calculate booths sold to vendors
    const boothsSold = await this.prisma.booth.count({
      where: { eventId, status: 'SOLD' }
    });

    return {
      totalRevenue: revenueResult._sum.totalAmount || 0,
      ticketsSold: ticketsSold._sum.quantity || 0,
      totalOrders,
      boothsSold
    };
  }

  /**
   * STAT-02: Custom Reports (Attendee List)
   * Fetches flat, tabular data formatted for exporting as CSV or PDF on the frontend.
   */
  async getAttendeeListReport(eventId: string) {
    const orders = await this.prisma.order.findMany({
      where: { eventId, status: 'COMPLETED' },
      include: {
        attendee: {
          select: { fullName: true, email: true, phoneNumber: true }
        },
        items: {
          include: { tier: { select: { name: true } } }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Map the complex nested data into a flat array for easy CSV generation
    return orders.map(order => ({
      orderId: order.orderNumber,
      date: order.createdAt,
      attendeeName: order.attendee.fullName,
      attendeeEmail: order.attendee.email,
      phone: order.attendee.phoneNumber || 'N/A',
      ticketTypes: order.items.map(item => `${item.quantity}x ${item.tier.name}`).join(', '),
      totalPaid: Number(order.totalAmount)
    }));
  }

  /**
   * STAT-03: System Wide Admin Metrics
   * Super-admin view of the entire platform's health and profitability.
   */
  async getPlatformMetrics() {
    const totalUsers = await this.prisma.user.count();
    const totalEvents = await this.prisma.event.count();
    
    // Platform makes money from the serviceFee charged on each order
    const platformRevenue = await this.prisma.order.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { serviceFee: true } 
    });

    return {
      totalUsers,
      totalEvents,
      totalPlatformRevenue: platformRevenue._sum.serviceFee ? Number(platformRevenue._sum.serviceFee) : 0
    };
  }
}
