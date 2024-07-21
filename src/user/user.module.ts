import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EmailService } from 'src/email/email.service';
import { SMSService } from 'src/sms/sms.service';

@Module({
  controllers: [UserController],
  providers: [UserService, EmailService, SMSService],
})
export class UserModule {}
