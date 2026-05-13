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
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let NotificationService = NotificationService_1 = class NotificationService {
    prisma;
    logger = new common_1.Logger(NotificationService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async sendBookingConfirmation(orderId) {
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
        this.logger.log(`[EMAIL OUTBOX] To: ${order.attendee.email}`);
        this.logger.log(`[EMAIL SUBJECT] Your Tickets for ${order.event.title} are confirmed!`);
        this.logger.log(`[EMAIL BODY] Hi ${order.attendee.fullName}, your payment of $${order.totalAmount} was successful.`);
        return true;
    }
    async sendAbandonedCartReminder(orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { attendee: true, event: true }
        });
        if (!order || order.status !== 'PENDING')
            return false;
        this.logger.log(`[EMAIL OUTBOX] To: ${order.attendee.email}`);
        this.logger.log(`[EMAIL SUBJECT] Complete your booking for ${order.event.title}!`);
        this.logger.log(`[EMAIL BODY] Your cart will expire soon. Click here to checkout.`);
        return true;
    }
    async sendVendorApplicationStatus(vendorId, boothName, status) {
        const vendor = await this.prisma.user.findUnique({ where: { id: vendorId } });
        if (!vendor)
            return false;
        this.logger.log(`[EMAIL OUTBOX] To: ${vendor.email}`);
        this.logger.log(`[EMAIL SUBJECT] Update on your Booth Application: ${boothName}`);
        this.logger.log(`[EMAIL BODY] Your application status has been updated to: ${status}.`);
        return true;
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map