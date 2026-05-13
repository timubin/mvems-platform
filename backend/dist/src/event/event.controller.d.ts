import { EventService } from './event.service';
export declare class EventController {
    private readonly eventService;
    constructor(eventService: EventService);
    create(data: any): Promise<any>;
    findAll(search?: string): Promise<any>;
    findOne(slug: string): Promise<any>;
}
