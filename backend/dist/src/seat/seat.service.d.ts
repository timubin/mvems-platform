export declare class SeatService {
    lockSeat(eventId: string, seatId: string, userId: string): Promise<boolean>;
    releaseSeatLock(eventId: string, seatId: string): Promise<void>;
}
