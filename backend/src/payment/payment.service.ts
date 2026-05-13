import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPaymentIntent(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'PENDING')
      throw new BadRequestException('Order is no longer pending');

    if (new Date() > order.expiresAt) {
      await this.prisma.order.update({
        where: { id: order.id },
        data: { status: 'EXPIRED' },
      });
      throw new BadRequestException(
        'Order has expired. Please try booking again.',
      );
    }

    return { clientSecret: 'pi_mock_secret_for_development' };
  }

  async handleStripeWebhook(signature: string, payload: Buffer) {
    // Boilerplate for real implementation
    console.log(
      `Processing webhook with sig: ${signature} and payload length: ${payload.length}`,
    );
    return Promise.resolve({ received: true });
  }
}
