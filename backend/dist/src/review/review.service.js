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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ReviewService = class ReviewService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createReview(attendeeId, eventId, rating, comment) {
        if (rating < 1 || rating > 5) {
            throw new common_1.BadRequestException('Rating must be between 1 and 5');
        }
        const validOrder = await this.prisma.order.findFirst({
            where: {
                attendeeId,
                eventId,
                status: 'COMPLETED'
            }
        });
        if (!validOrder) {
            throw new common_1.ForbiddenException('You can only review events you have successfully booked and attended.');
        }
        const existingReview = await this.prisma.review.findFirst({
            where: { attendeeId, eventId }
        });
        if (existingReview) {
            throw new common_1.BadRequestException('You have already reviewed this event.');
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
    async getEventReviews(eventId) {
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
    async moderateReview(reviewId, isApproved) {
        const review = await this.prisma.review.findUnique({ where: { id: reviewId } });
        if (!review)
            throw new common_1.NotFoundException('Review not found');
        return this.prisma.review.update({
            where: { id: reviewId },
            data: { isApproved }
        });
    }
    async getEventAverageRating(eventId) {
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
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewService);
//# sourceMappingURL=review.service.js.map