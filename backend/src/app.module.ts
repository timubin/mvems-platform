import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';
import { ReviewModule } from './review/review.module';
import { VendorModule } from './vendor/vendor.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { PrismaModule } from './prisma.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100, // General limit: 100 requests per minute
      },
    ]),
    PrismaModule,
    AuthModule,
    UsersModule,
    EventModule,
    TicketModule,
    OrderModule,
    PaymentModule,
    NotificationModule,
    ReviewModule,
    VendorModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
