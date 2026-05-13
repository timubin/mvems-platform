import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getEventDashboardMetrics(eventId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });
    if (!event) throw new NotFoundException('Event not found');

    const totalOrders = await this.prisma.order.count({
      where: { eventId, status: 'COMPLETED' },
    });

    const revenueResult = await this.prisma.order.aggregate({
      where: { eventId, status: 'COMPLETED' },
      _sum: { totalAmount: true },
    });

    const ticketsSold = await this.prisma.orderItem.aggregate({
      where: { order: { eventId, status: 'COMPLETED' } },
      _sum: { quantity: true },
    });

    const boothsSold = await this.prisma.booth.count({
      where: { eventId, isAssigned: true },
    });

    return {
      totalRevenue: revenueResult._sum.totalAmount || 0,
      ticketsSold: ticketsSold._sum.quantity || 0,
      totalOrders,
      boothsSold,
    };
  }

  async getAttendeeListReport(eventId: string) {
    const orders = await this.prisma.order.findMany({
      where: { eventId, status: 'COMPLETED' },
      include: {
        attendee: {
          select: { fullName: true, email: true, phone: true },
        },
        items: {
          include: { ticketTier: { select: { name: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return orders.map((order) => ({
      orderId: order.id,
      date: order.createdAt,
      attendeeName: order.attendee.fullName,
      attendeeEmail: order.attendee.email,
      phone: order.attendee.phone || 'N/A',
      ticketTypes: order.items
        .map((item) => `${item.quantity}x ${item.ticketTier.name}`)
        .join(', '),
      totalPaid: Number(order.totalAmount),
    }));
  }

  async getPlatformMetrics() {
    const totalUsers = await this.prisma.user.count();
    const totalEvents = await this.prisma.event.count();

    const platformRevenue = await this.prisma.order.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { serviceFee: true },
    });

    return {
      totalUsers,
      totalEvents,
      totalPlatformRevenue: platformRevenue._sum.serviceFee
        ? Number(platformRevenue._sum.serviceFee)
        : 0,
    };
  }
}
