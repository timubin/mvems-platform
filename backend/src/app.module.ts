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

@Module({
  imports: [AuthModule, UsersModule, EventModule, TicketModule, OrderModule, PaymentModule, NotificationModule, ReviewModule, VendorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
