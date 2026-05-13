import { PrismaService } from '../prisma.service';
export declare class EventService {
    private prisma;
    constructor(prisma: PrismaService);
    createEvent(organizerId: string, data: any): Promise<any>;
    getAllPublicEvents(): Promise<any>;
    getEventBySlug(slug: string): Promise<any>;
}
