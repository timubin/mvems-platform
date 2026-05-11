import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

/**
 * Phase 9 - REVIEW & FEEDBACK SYSTEM (Module 10)
 */
@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  /**
   * REV-01: Post-Event Reviews
   * Ensures that only verified attendees (those with COMPLETED orders) can rate and leave comments.
   */
  async createReview(attendeeId: string, eventId: string, rating: number, comment?: string) {
    if (rating < 1 || rating > 5) {
      throw new BadRequestException('Rating must be between 1 and 5');
    }

    // Check if the user actually attended the event
    const validOrder = await this.prisma.order.findFirst({
      where: {
        attendeeId,
        eventId,
        status: 'COMPLETED'
      }
    });

    if (!validOrder) {
      throw new ForbiddenException('You can only review events you have successfully booked and attended.');
    }

    // Prevent multiple reviews from the same user for the same event
    const existingReview = await this.prisma.review.findFirst({
      where: { attendeeId, eventId }
    });

    if (existingReview) {
      throw new BadRequestException('You have already reviewed this event.');
    }

    return this.prisma.review.create({
      data: {
        attendeeId,
        eventId,
        rating,
        comment,
      }
    });
  }

  /**
   * Fetch all approved reviews to display on the Event Details page.
   */
  async getEventReviews(eventId: string) {
    return this.prisma.review.findMany({
      where: { eventId, isApproved: true },
      include: {
        attendee: {
          select: { fullName: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  /**
   * REV-02: Moderation (Admin/Organizer Action)
   * Allows admins to hide or approve flagged reviews.
   */
  async moderateReview(reviewId: string, isApproved: boolean) {
    const review = await this.prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundException('Review not found');

    return this.prisma.review.update({
      where: { id: reviewId },
      data: { isApproved }
    });
  }

  /**
   * REV-03: Analytics
   * Calculates the average rating and total review count for an event.
   */
  async getEventAverageRating(eventId: string) {
    const result = await this.prisma.review.aggregate({
      where: { eventId, isApproved: true },
      _avg: { rating: true },
      _count: { id: true }
    });

    return {
      averageRating: result._avg.rating ? Number(result._avg.rating.toFixed(1)) : 0,
      totalReviews: result._count.id
    };
  }
}
