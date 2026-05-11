import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  /**
   * ORD-01 & ORD-03: Create an order with ticket items and apply coupon
   */
  async createOrder(attendeeId: string, eventId: string, items: { tierId: string, quantity: number }[], couponCode?: string) {
    let subtotal = 0;
    const orderItemsData = [];

    // 1. Fetch Ticket Tiers to validate pricing and availability
    for (const item of items) {
      const tier = await this.prisma.ticketTier.findUnique({ where: { id: item.tierId } });
      if (!tier || tier.eventId !== eventId) {
        throw new BadRequestException(`Invalid ticket tier: ${item.tierId}`);
      }
      
      if (tier.capacity - tier.soldCount < item.quantity) {
        throw new BadRequestException(`Not enough tickets available for ${tier.name}`);
      }

      // Check Early Bird Pricing (TKT-03)
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

    // 2. Coupon Application (ORD-03)
    let discountAmount = 0;
    let couponId = null;

    if (couponCode) {
      const coupon = await this.prisma.coupon.findUnique({ where: { code: couponCode } });
      if (!coupon || coupon.eventId !== eventId) throw new NotFoundException('Invalid coupon code');
      if (new Date() > coupon.validUntil) throw new BadRequestException('Coupon has expired');
      if (coupon.maxUses > 0 && coupon.usesCount >= coupon.maxUses) throw new BadRequestException('Coupon limit reached');
      if (subtotal < Number(coupon.minOrderAmount)) throw new BadRequestException(`Minimum order amount is ${coupon.minOrderAmount}`);

      couponId = coupon.id;
      if (coupon.discountType === 'PERCENTAGE') {
        discountAmount = (subtotal * Number(coupon.discountValue)) / 100;
      } else {
        discountAmount = Number(coupon.discountValue);
      }

      if (discountAmount > subtotal) discountAmount = subtotal;
    }

    // 3. Tax and Fee Calculation (ORD-04, ORD-05)
    const serviceFee = subtotal * 0.05; // 5% platform fee
    const taxAmount = (subtotal - discountAmount) * 0.15; // 15% VAT
    const totalAmount = subtotal - discountAmount + serviceFee + taxAmount;

    // 4. Create Order and Set Expiry Timer (ORD-06)
    const expiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes expiry

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
}
