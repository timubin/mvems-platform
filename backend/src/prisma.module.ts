import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RedisService } from './redis.service';
import { BillingService } from './billing.service';

@Global()
@Module({
  providers: [PrismaService, RedisService, BillingService],
  exports: [PrismaService, RedisService, BillingService],
})
export class PrismaModule {}
