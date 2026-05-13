import { PrismaService } from '../prisma.service';
export declare class ReviewService {
    private prisma;
    constructor(prisma: PrismaService);
    createReview(attendeeId: string, eventId: string, rating: number, comment?: string): Promise<any>;
    getEventReviews(eventId: string): Promise<any>;
    moderateReview(reviewId: string, isApproved: boolean): Promise<any>;
    getEventAverageRating(eventId: string): Promise<{
        averageRating: number;
        totalReviews: any;
    }>;
}
