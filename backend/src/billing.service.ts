import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SubStatus } from '@prisma/client';

@Injectable()
export class BillingService {
  constructor(private prisma: PrismaService) {}

  async createSubscription(organizerId: string, planId: string) {
    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });
    if (!plan) throw new BadRequestException('Invalid subscription plan');

    return this.prisma.organizerSubscription.upsert({
      where: { organizerId },
      update: {
        planId,
        status: SubStatus.ACTIVE,
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
      create: {
        organizerId,
        planId,
        status: SubStatus.ACTIVE,
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });
  }

  async checkSubscriptionStatus(organizerId: string) {
    const sub = await this.prisma.organizerSubscription.findUnique({
      where: { organizerId },
      include: { plan: true },
    });

    if (!sub || sub.status !== SubStatus.ACTIVE) return { active: false };
    
    const now = new Date();
    if (sub.currentPeriodEnd < now) {
      await this.prisma.organizerSubscription.update({
        where: { id: sub.id },
        data: { status: SubStatus.PAST_DUE },
      });
      return { active: false, status: 'PAST_DUE' };
    }

    return { active: true, plan: sub.plan };
  }
}
