import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EventService } from './event.service';
import type { CreateEventDto } from './event.service';
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

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ORGANIZER, Role.SUPER_ADMIN)
  @Post()
  async create(@Req() req: RequestWithUser, @Body() data: CreateEventDto) {
    return this.eventService.createEvent(req.user.userId, data);
  }

  @Get()
  async findAll(@Query('search') search?: string) {
    return this.eventService.getAllPublicEvents(search);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.eventService.getEventBySlug(slug);
  }
}
