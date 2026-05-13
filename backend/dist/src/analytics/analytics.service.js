"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let AnalyticsService = class AnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getEventDashboardMetrics(eventId) {
        const event = await this.prisma.event.findUnique({ where: { id: eventId } });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        const totalOrders = await this.prisma.order.count({
            where: { eventId, status: 'COMPLETED' }
        });
        const revenueResult = await this.prisma.order.aggregate({
            where: { eventId, status: 'COMPLETED' },
            _sum: { totalAmount: true }
        });
        const ticketsSold = await this.prisma.orderItem.aggregate({
            where: { order: { eventId, status: 'COMPLETED' } },
            _sum: { quantity: true }
        });
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
    async getAttendeeListReport(eventId) {
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
    async getPlatformMetrics() {
        const totalUsers = await this.prisma.user.count();
        const totalEvents = await this.prisma.event.count();
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
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map