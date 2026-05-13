import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() data: any) {
    return this.eventService.createEvent(data);
  }

  @Get()
  async findAll(@Query('search') search?: string) {
    return this.eventService.getPublicEvents(search);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.eventService.getEventBySlug(slug);
  }
}
