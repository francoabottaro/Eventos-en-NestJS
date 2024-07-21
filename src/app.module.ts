import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './user/user.module';
import { EmailService } from './email/email.service';
import { SMSService } from './sms/sms.service';

@Module({
  imports: [EventEmitterModule.forRoot(), UserModule],
  controllers: [AppController],
  providers: [AppService, EmailService, SMSService],
})
export class AppModule {}
