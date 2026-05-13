import {
  Injectable,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async createReview(
    attendeeId: string,
    eventId: string,
    rating: number,
    comment?: string,
  ) {
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    const validOrder = await this.prisma.order.findFirst({
      where: {
        attendeeId,
        eventId,
        status: 'COMPLETED',
      },
    });

    if (!validOrder) {
      throw new ForbiddenException(
        'You can only review events you have successfully booked and attended.',
      );
    }

    const existingReview = await this.prisma.review.findFirst({
      where: { attendeeId, eventId },
    });

    if (existingReview) {
      throw new BadRequestException('You have already reviewed this event.');
    }

    return this.prisma.review.create({
      data: {
        attendeeId,
        eventId,
        rating,
        textReview: comment,
      },
    });
  }

  async getEventReviews(eventId: string) {
    return this.prisma.review.findMany({
      where: { eventId },
      include: {
        attendee: {
          select: { fullName: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async moderateReview(reviewId: string) {
    const review = await this.prisma.review.findUnique({
      where: { id: reviewId },
    });
    if (!review) throw new NotFoundException('Review not found');

    return review;
  }

  async getEventAverageRating(eventId: string) {
    const result = await this.prisma.review.aggregate({
      where: { eventId },
      _avg: { rating: true },
      _count: { id: true },
    });

    return {
      averageRating: result._avg?.rating
        ? Number(result._avg.rating.toFixed(1))
        : 0,
      totalReviews: result._count?.id || 0,
    };
  }
}
