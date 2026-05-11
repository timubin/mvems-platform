import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  /**
   * EVT-01: Event Creation
   * Allows organizers to create an event.
   */
  async createEvent(organizerId: string, data: any) {
    return this.prisma.event.create({
      data: {
        organizerId,
        title: data.title,
        slug: data.slug,
        description: data.description,
        type: data.type || 'PUBLIC',
        format: data.format || 'PHYSICAL',
        startDatetime: new Date(data.startDatetime),
        endDatetime: new Date(data.endDatetime),
        venueName: data.venueName,
        capacity: data.capacity || 0,
        status: 'DRAFT'
      },
    });
  }

  /**
   * List all public events for the frontend discovery page
   */
  async getAllPublicEvents() {
    return this.prisma.event.findMany({
      where: { 
        type: 'PUBLIC',
        status: 'PUBLISHED'
      },
      include: {
        organizer: {
          select: { fullName: true, businessName: true }
        },
        tickets: {
          select: { name: true, price: true, type: true }
        }
      },
      orderBy: {
        startDatetime: 'asc'
      }
    });
  }

  /**
   * Get complete event details (including Phase 3 features like sessions and speakers)
   */
  async getEventBySlug(slug: string) {
    const event = await this.prisma.event.findUnique({
      where: { slug },
      include: { 
        tickets: true, 
        sessions: true, 
        speakers: true,
        booths: true 
      }
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }
}
