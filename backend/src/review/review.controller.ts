import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';

interface RequestWithUser extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
  };
}

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ATTENDEE)
  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() body: { eventId: string; rating: number; comment?: string },
  ) {
    return this.reviewService.createReview(
      req.user.userId,
      body.eventId,
      body.rating,
      body.comment,
    );
  }

  @Get('event/:eventId')
  async getEventReviews(@Param('eventId') eventId: string) {
    return this.reviewService.getEventReviews(eventId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ORGANIZER)
  @Patch(':id/moderate')
  async moderate(@Param('id') id: string) {
    return this.reviewService.moderateReview(id);
  }
}
