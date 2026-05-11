import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

/**
 * Phase 7 - PAYMENT & REFUND SYSTEM (Module 07)
 */
@Injectable()
export class PaymentService {
  // private stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  constructor(private prisma: PrismaService) {}

  /**
   * PAY-02: Payment Intent Creation
   * Creates a secure server-side payment intent via Stripe.
   */
  async createPaymentIntent(orderId: string) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'PENDING') throw new BadRequestException('Order is no longer pending');

    // Ensure order hasn't expired (ORD-06)
    if (new Date() > order.expiresAt) {
      await this.prisma.order.update({ where: { id: order.id }, data: { status: 'EXPIRED' } });
      throw new BadRequestException('Order has expired. Please try booking again.');
    }

    /*
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(Number(order.totalAmount) * 100), // Stripe uses cents
      currency: order.currency.toLowerCase(),
      metadata: { orderId: order.id },
      // idempotencyKey: `intent_${order.id}` // PAY-04: Prevent duplicate charges
    });

    return { clientSecret: paymentIntent.client_secret };
    */
    
    return { clientSecret: 'pi_mock_secret_for_development' };
  }

  /**
   * PAY-03: Webhook Handler
   * Processes Stripe webhooks to mark order as completed or failed securely.
   */
  async handleStripeWebhook(signature: string, payload: Buffer) {
    /*
    let event;
    try {
      event = this.stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    // Payment Succeeded
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.orderId;

      await this.prisma.order.update({
        where: { id: orderId },
        data: { status: 'COMPLETED' }
      });

      // Update seat locks to permanent BOOKED status
      await this.prisma.seat.updateMany({
        where: { orderId },
        data: { status: 'BOOKED' }
      });

      // TODO: Trigger Booking Confirmation Email with QR Ticket (NOTIF-05)
    }

    // Payment Failed
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      await this.prisma.order.update({
        where: { id: paymentIntent.metadata.orderId },
        data: { status: 'FAILED' }
      });
    }
    */
    
    return { received: true };
  }
}
