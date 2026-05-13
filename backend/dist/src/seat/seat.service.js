"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeatService = void 0;
const common_1 = require("@nestjs/common");
let SeatService = class SeatService {
    async lockSeat(eventId, seatId, userId) {
        const lockKey = `seat:${eventId}:${seatId}`;
        const lockTTL = 300;
        return true;
    }
    async releaseSeatLock(eventId, seatId) {
        const lockKey = `seat:${eventId}:${seatId}`;
    }
};
exports.SeatService = SeatService;
exports.SeatService = SeatService = __decorate([
    (0, common_1.Injectable)()
], SeatService);
//# sourceMappingURL=seat.service.js.map