import { Injectable } from '@nestjs/common';

@Injectable()
export class SMSService {
  public sendSMS(phonenumber: number, message: string) {
    console.log(`${phonenumber}:\n${message}`);
  }
}
