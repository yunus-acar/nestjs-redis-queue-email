import { Module } from '@nestjs/common';
import { QueueModule } from './queue/queue.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    QueueModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
