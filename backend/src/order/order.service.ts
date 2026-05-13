import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

interface OrderItemInput {
  tierId: string;
  quantity: number;
}

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(
    attendeeId: string,
    eventId: string,
    items: OrderItemInput[],
    couponCode?: string,
  ) {
    let subtotal = 0;
    const orderItemsData = [];

    for (const item of items) {
      const tier = await this.prisma.ticketTier.findUnique({
        where: { id: item.tierId },
      });
      if (!tier || tier.eventId !== eventId) {
        throw new BadRequestException(`Invalid ticket tier: ${item.tierId}`);
      }

      if (tier.capacity - tier.soldCount < item.quantity) {
        throw new BadRequestException(
          `Not enough tickets available for ${tier.name}`,
        );
      }

      const now = new Date();
      let price = Number(tier.price);
      if (
        tier.earlyBirdPrice &&
        tier.earlyBirdUntil &&
        now < tier.earlyBirdUntil
      ) {
        price = Number(tier.earlyBirdPrice);
      }

      subtotal += price * item.quantity;
      orderItemsData.push({
        tierId: tier.id,
        quantity: item.quantity,
        unitPrice: price,
      });
    }

    let discountAmount = 0;
    let couponId: string | null = null;

    if (couponCode) {
      const coupon = await this.prisma.coupon.findUnique({
        where: { code: couponCode },
      });
      if (!coupon || coupon.eventId !== eventId)
        throw new NotFoundException('Invalid coupon code');
      if (new Date() > coupon.validUntil)
        throw new BadRequestException('Coupon has expired');
      if (coupon.maxUses > 0 && coupon.usesCount >= coupon.maxUses)
        throw new BadRequestException('Coupon limit reached');
      if (subtotal < Number(coupon.minOrderAmount))
        throw new BadRequestException(
          `Minimum order amount is ${coupon.minOrderAmount.toString()}`,
        );

      couponId = coupon.id;
      if (coupon.discountType === 'PERCENTAGE') {
        discountAmount = (subtotal * Number(coupon.discountValue)) / 100;
      } else {
        discountAmount = Number(coupon.discountValue);
      }

      if (discountAmount > subtotal) discountAmount = subtotal;
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
          create: orderItemsData,
        },
      },
      include: { items: true },
    });

    return order;
  }
}
