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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let OrderService = class OrderService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrder(attendeeId, eventId, items, couponCode) {
        let subtotal = 0;
        const orderItemsData = [];
        for (const item of items) {
            const tier = await this.prisma.ticketTier.findUnique({ where: { id: item.tierId } });
            if (!tier || tier.eventId !== eventId) {
                throw new common_1.BadRequestException(`Invalid ticket tier: ${item.tierId}`);
            }
            if (tier.capacity - tier.soldCount < item.quantity) {
                throw new common_1.BadRequestException(`Not enough tickets available for ${tier.name}`);
            }
            const now = new Date();
            let price = Number(tier.price);
            if (tier.earlyBirdPrice && tier.earlyBirdUntil && now < tier.earlyBirdUntil) {
                price = Number(tier.earlyBirdPrice);
            }
            subtotal += price * item.quantity;
            orderItemsData.push({
                tierId: tier.id,
                quantity: item.quantity,
                unitPrice: price
            });
        }
        let discountAmount = 0;
        let couponId = null;
        if (couponCode) {
            const coupon = await this.prisma.coupon.findUnique({ where: { code: couponCode } });
            if (!coupon || coupon.eventId !== eventId)
                throw new common_1.NotFoundException('Invalid coupon code');
            if (new Date() > coupon.validUntil)
                throw new common_1.BadRequestException('Coupon has expired');
            if (coupon.maxUses > 0 && coupon.usesCount >= coupon.maxUses)
                throw new common_1.BadRequestException('Coupon limit reached');
            if (subtotal < Number(coupon.minOrderAmount))
                throw new common_1.BadRequestException(`Minimum order amount is ${coupon.minOrderAmount}`);
            couponId = coupon.id;
            if (coupon.discountType === 'PERCENTAGE') {
                discountAmount = (subtotal * Number(coupon.discountValue)) / 100;
            }
            else {
                discountAmount = Number(coupon.discountValue);
            }
            if (discountAmount > subtotal)
                discountAmount = subtotal;
        }
        const serviceFee = subtotal * 0.05;
        const taxAmount = (subtotal - discountAmount) * 0.15;
        const totalAmount = subtotal - discountAmount + serviceFee + taxAmount;
        const expiresAt = new Date(Date.now() + 10 * 60000);
        const order = await this.prisma.order.create({
            data: {
                attendeeId,
                eventId,
                couponId,
                status: 'PENDING',
                subtotal,
                discountAmount,
                serviceFee,
                taxAmount,
                totalAmount,
                expiresAt,
                items: {
                    create: orderItemsData
                }
            },
            include: { items: true }
        });
        return order;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map