import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

export interface CreateEventDto {
  title: string;
  slug: string;
  description: string;
  type?: any;
  format?: any;
  startDatetime: string | number | Date;
  endDatetime: string | number | Date;
  venueName?: string;
  capacity?: number;
}

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async createEvent(organizerId: string, data: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        organizer: { connect: { id: organizerId } },
        title: data.title,
        slug: data.slug,
        description: data.description,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: data.type || 'PUBLIC',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        format: data.format || 'PHYSICAL',
        startDatetime: new Date(data.startDatetime),
        endDatetime: new Date(data.endDatetime),
        venueName: data.venueName,
        capacity: data.capacity || 0,
        status: 'DRAFT',
      },
    });
  }

  async getAllPublicEvents(search?: string) {
    const where: Prisma.EventWhereInput = {
      type: 'PUBLIC',
      status: 'PUBLISHED',
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.event.findMany({
      where,
      include: {
        organizer: {
          select: { fullName: true, businessName: true },
        },
        tickets: {
          select: { name: true, price: true, type: true },
        },
      },
      orderBy: {
        startDatetime: 'asc',
      },
    });
  }

  async getEventBySlug(slug: string) {
    const event = await this.prisma.event.findUnique({
      where: { slug },
      include: {
        tickets: true,
        sessions: true,
        speakers: true,
        booths: true,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }
}
