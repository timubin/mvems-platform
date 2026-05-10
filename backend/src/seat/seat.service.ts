import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';

/**
 * Phase 2 - SEAT BOOKING ENGINE (Module 05)
 * This service demonstrates the Distributed Locking mechanism using Redis
 * to prevent double-booking during high concurrency.
 */
@Injectable()
export class SeatService {
  // private prisma = new PrismaService();
  // private redisClient = new Redis(process.env.REDIS_URL);

  /**
   * SEAT-05: Distributed Seat Locking
   * User selects a seat -> System tries to acquire Redis lock for 5 minutes.
   */
  async lockSeat(eventId: string, seatId: string, userId: string): Promise<boolean> {
    const lockKey = `seat:${eventId}:${seatId}`;
    const lockTTL = 300; // 5 minutes

    /*
    // 1. Attempt to acquire Redis Lock atomically
    const lockAcquired = await this.redisClient.set(lockKey, userId, 'EX', lockTTL, 'NX');
    
    if (!lockAcquired) {
      throw new ConflictException('Seat is currently locked by another user.');
    }

    // 2. Update Database State
    await this.prisma.seat.update({
      where: { id: seatId },
      data: { status: 'LOCKED', bookedById: userId }
    });

    // 3. Emit Real-time WebSocket Event (RT-03)
    // this.websocketGateway.server.to(eventId).emit('seat:locked', { seatId, status: 'LOCKED' });
    */

    return true;
  }

  /**
   * SEAT-06: Lock TTL Auto-Release
   * Called automatically when the order expires or the user cancels checkout.
   */
  async releaseSeatLock(eventId: string, seatId: string): Promise<void> {
    const lockKey = `seat:${eventId}:${seatId}`;

    /*
    // 1. Delete Redis Lock
    await this.redisClient.del(lockKey);

    // 2. Revert Database State
    await this.prisma.seat.update({
      where: { id: seatId },
      data: { status: 'AVAILABLE', bookedById: null }
    });

    // 3. Emit Real-time WebSocket Event
    // this.websocketGateway.server.to(eventId).emit('seat:released', { seatId, status: 'AVAILABLE' });
    */
  }
}
