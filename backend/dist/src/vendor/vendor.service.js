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
exports.VendorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let VendorService = class VendorService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async applyForBooth(vendorId, boothId) {
        const booth = await this.prisma.booth.findUnique({ where: { id: boothId } });
        if (!booth)
            throw new common_1.NotFoundException('Booth not found');
        if (booth.status !== 'AVAILABLE')
            throw new common_1.BadRequestException('Booth is not available or already booked');
        const application = await this.prisma.boothApplication.create({
            data: {
                boothId,
                vendorId,
                status: 'PENDING',
            }
        });
        await this.prisma.booth.update({
            where: { id: boothId },
            data: { status: 'PENDING' }
        });
        return application;
    }
    async processApplication(applicationId, action) {
        const app = await this.prisma.boothApplication.findUnique({ where: { id: applicationId } });
        if (!app)
            throw new common_1.NotFoundException('Application not found');
        await this.prisma.boothApplication.update({
            where: { id: applicationId },
            data: { status: action }
        });
        if (action === 'REJECTED') {
            await this.prisma.booth.update({
                where: { id: app.boothId },
                data: { status: 'AVAILABLE', vendorId: null }
            });
        }
        else {
            await this.prisma.booth.update({
                where: { id: app.boothId },
                data: { status: 'SOLD', vendorId: app.vendorId }
            });
        }
        return { success: true, status: action };
    }
    async getVenueMapBooths(eventId) {
        return this.prisma.booth.findMany({
            where: { eventId },
            include: {
                vendor: {
                    select: { businessName: true }
                }
            },
            orderBy: { name: 'asc' }
        });
    }
    async collectLead(vendorId, scannedAttendeeId) {
        const attendee = await this.prisma.user.findUnique({
            where: { id: scannedAttendeeId },
            select: { id: true, fullName: true, email: true, phoneNumber: true }
        });
        if (!attendee)
            throw new common_1.NotFoundException('Invalid QR code / Attendee not found');
        return {
            message: 'Lead collected successfully',
            lead: attendee
        };
    }
};
exports.VendorService = VendorService;
exports.VendorService = VendorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VendorService);
//# sourceMappingURL=vendor.service.js.map