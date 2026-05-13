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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let EventService = class EventService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createEvent(organizerId, data) {
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
    async getEventBySlug(slug) {
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
            throw new common_1.NotFoundException('Event not found');
        }
        return event;
    }
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EventService);
//# sourceMappingURL=event.service.js.map